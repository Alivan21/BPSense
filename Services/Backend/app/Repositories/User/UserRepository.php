<?php
namespace App\Repositories\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserRepository implements UserRepositoryInterface
{
    protected Builder $query;

    public function __construct(User $user)
    {
        $this->query = $user->query();
    }

    public function searchByName(string $name)
    {
        return $this->query
            ->where('name', 'like', "%$name%")
            ->get();
    }

    public function searchByNip(string $nip)
    {
        return $this->query
            ->where('nip', 'like', "%$nip%")
            ->get();
    }

    public function searchByNipAndName(string $nip, string $name)
    {
        return $this->query
            ->where('nip', 'like', "%$nip%")
            ->orWhere('name', 'like', "%$name%")
            ->get();
    }

    public function findOrFailByNip(string $nip)
    {
        return $this->query
            ->where('nip', $nip)
            ->firstOrFail();
    }

    public function findOrFailByNipAndBirthDate(array $data)
    {
        return $this->query
            ->where('nip', $data['nip'])
            ->where('birth_date', $data['birth_date'])
            ->firstOrFail();
    }

    public function getAllDataOfficer() {
        return $this->query->with(['role', 'images'])->whereHas('role', function ($role) {
            $role->where('name', 'officer');
        })->orderBy('created_at')->get();
    }
}
