<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

beforeEach(function () {
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
});

it('can create a user with a specific role', function () {
    $role = Role::where('slug', 'user')->first();

    $user = User::create([
        'name' => 'Alice Brown',
        'email' => 'alice@example.com',
        'password' => Hash::make('password123'),
        'role_id' => $role->id,
    ]);

    expect($user)->toBeInstanceOf(User::class);
    expect($user->name)->toBe('Alice Brown');
    expect($user->email)->toBe('alice@example.com');
    expect($user->role_id)->toBe($role->id);
    expect($user->role->slug)->toBe('user');

    $this->assertDatabaseHas('users', [
        'email' => 'alice@example.com',
        'role_id' => $role->id,
    ]);
});

it('can create users with different roles using factory', function () {
    $admin = User::factory()->admin()->create([
        'email' => 'admin@example.com',
    ]);
    $editor = User::factory()->editor()->create([
        'email' => 'editor@example.com',
    ]);
    $user = User::factory()->create([
        'email' => 'user@example.com',
    ]);

    expect($admin->role->slug)->toBe('admin');
    expect($editor->role->slug)->toBe('editor');
    expect($user->role->slug)->toBe('user');

    $this->assertDatabaseHas('users', [
        'email' => 'admin@example.com',
        'role_id' => Role::where('slug', 'admin')->first()->id,
    ]);
    $this->assertDatabaseHas('users', [
        'email' => 'editor@example.com',
        'role_id' => Role::where('slug', 'editor')->first()->id,
    ]);
    $this->assertDatabaseHas('users', [
        'email' => 'user@example.com',
        'role_id' => Role::where('slug', 'user')->first()->id,
    ]);
});
