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
}
