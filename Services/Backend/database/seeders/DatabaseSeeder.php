<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use Illuminate\Database\Seeder;

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

        $this->call([
            UserSeeder::class,
            // OfficerSeeder::class,
            // VisitorSeeder::class,
            // VisitorHistorySeeder::class,
        ]);
    }
}
