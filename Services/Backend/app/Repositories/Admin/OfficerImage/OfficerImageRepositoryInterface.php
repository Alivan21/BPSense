<?php

namespace App\Repositories\Admin\OfficerImage;

interface OfficerImageRepositoryInterface
{
    public function getAllDatabyOfficerId(string $id);

    public function createData(array $data);
}
