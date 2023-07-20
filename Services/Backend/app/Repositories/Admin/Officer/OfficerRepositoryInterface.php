<?php

namespace App\Repositories\Admin\Officer;

use App\Models\User;

interface OfficerRepositoryInterface
{
    public function getAllData();

    public function searchDataWithNameOrNip(string $keyword);

    public function createData(array $data);

    public function updateData(User $officer, array $data);

    public function updateQrCode(User $officer, string $path);

    public function deleteData(User $officer);

    public function resetPassword(User $officer, string $password);
    
}
