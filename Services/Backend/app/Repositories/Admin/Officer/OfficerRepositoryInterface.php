<?php

namespace App\Repositories\Admin\Officer;

use App\Models\User;

interface OfficerRepositoryInterface
{
    public function getAllData();

    public function searchDataWithNameOrNip(string $keyword);
    
    public function createData(array $data);

    public function updateData(User $officer, array $data);

    public function deleteData(User $officer);
}
