<?php
namespace App\Repositories\Role;

use App\Models\Role;
use Illuminate\Database\Eloquent\Builder;

class RoleRepository implements RoleRepositoryInterface
{
    protected Builder $query;

    public function __construct(Role $role)
    {
        $this->query = $role->query();
    }

    public function getIdbyRoleName(string $name) {
        return $this->query->where('name', $name)->first()->id ?? null;
    }
}