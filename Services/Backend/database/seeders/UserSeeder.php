<?php

namespace Database\Seeders;

use App\Commons\Enums\UserRoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([[
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'birth_date' => '1999-01-01',
            'role_id' => UserRoleEnum::ADMIN->value
        ]]);

        $dataPetugas = [
            'name' => 'Petugas Budi',
            'nip' => '123456789012345678',
            'username' => 'petugas',
            'phone' => '081234567890',
            'status' => 1,
            'password' => Hash::make('password'),
            'birth_date' => '1999-01-01',
            'role_id' => UserRoleEnum::EMPLOYEE->value,
        ];

        $insertDataPetugas = User::create($dataPetugas);

        $image = QrCode::size(300)->generate(Hash::make($insertDataPetugas->id) . "||" . Hash::make($insertDataPetugas->nip));
        $path = hash('sha256', $insertDataPetugas->id) . '/qrcode/qrcode.png';
        Storage::put($path, $image, 'public');

        $insertDataPetugas->update([
            'qrcode' => $path
        ]);
    }
}
