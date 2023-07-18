<?php

namespace App\Repositories\OfficerImage;

interface OfficerImageRepositoryInterface
{
    public function getAllDatabyOfficerId(string $id);

    public function createData(array $data);
}
