<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Ensure the 'user' role exists
        $role = Role::firstOrCreate(
            ['slug' => 'user'],
            [
                'name' => 'User',
                'description' => 'Regular user with limited access',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'role_id' => $role->id, // Use existing 'User' role
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this;
    }

    /**
     * Assign the 'admin' role.
     */
    public function admin(): static
    {
        return $this->state(function (array $attributes) {
            $role = Role::firstOrCreate(
                ['slug' => 'admin'],
                [
                    'name' => 'Admin',
                    'description' => 'Administrator with full access',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
            return ['role_id' => $role->id];
        });
    }

    /**
     * Assign the 'editor' role.
     */
    public function editor(): static
    {
        return $this->state(function (array $attributes) {
            $role = Role::firstOrCreate(
                ['slug' => 'editor'],
                [
                    'name' => 'Editor',
                    'description' => 'Editor with content management permissions',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
            return ['role_id' => $role->id];
        });
    }
}
