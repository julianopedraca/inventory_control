<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function run()
    {
        // Ensure roles exist
        $adminRole = Role::where('slug', 'admin')->first();
        $editorRole = Role::where('slug', 'editor')->first();
        $userRole = Role::where('slug', 'user')->first();

        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password123'),
                'role_id' => $adminRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'password' => Hash::make('password123'),
                'role_id' => $editorRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob.johnson@example.com',
                'password' => Hash::make('password123'),
                'role_id' => $userRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
