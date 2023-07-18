<?php

namespace App\Repositories\User;

interface UserRepositoryInterface
{
    public function findOrFailByNip(string $nip);

    public function findOrFailByNipAndBirthDate(array $data);

    public function getAllDataOfficer();
}
