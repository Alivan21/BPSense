<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Role::insert([
            ['name' => 'admin'],
            ['name' => 'officer'],
        ]);

        User::insert([[
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'birth_date' => '1999-01-01',
            'role_id' => 1
        ]]);

        User::insert(
            [
                'name' => 'Petugas Budi',
                'nip' => '123456789012345678',
                'password' => Hash::make('password'),
                'birth_date' => '1999-01-01',
                'role_id' => 2
            ]
        );
    }
}
