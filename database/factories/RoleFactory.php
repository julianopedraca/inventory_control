<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition()
    {
        return [
            'name' => 'User',
            'slug' => 'user',
            'description' => 'Regular user with limited access',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator with full access',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        });
    }

    public function editor()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Editor',
                'slug' => 'editor',
                'description' => 'Editor with content management permissions',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        });
    }
}
