<?php

namespace App\Repositories\Officer;

use App\Models\User;

interface OfficerRepositoryInterface
{   
    public function updateData(User $officer, array $data);
}
