<?php
namespace App\Repositories\Officer;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Hash;

class OfficerRepository implements OfficerRepositoryInterface
{
    protected Builder $query;

    public function __construct(User $officer)
    {
        $this->query = $officer->query();
    }

    public function updateData(User $officer, array $data) {
        return $officer->update($data) ? $officer : false;
    }

    public function updatePassword(User $officer, string $password) {
        $officer->password = Hash::make($password);
        return $officer->save() ? $officer : false;
    }
}