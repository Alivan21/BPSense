<?php

namespace App\Repositories\User;

interface UserRepositoryInterface
{
    public function searchByName(string $name);

    public function searchByNip(string $nip);

    public function searchByNipAndName(string $nip, string $name);

    public function findOrFailByNip(string $nip);
}
