<?php

namespace App\Repositories\Role;

interface RoleRepositoryInterface
{
    public function getIdbyRoleName(string $name);
}
