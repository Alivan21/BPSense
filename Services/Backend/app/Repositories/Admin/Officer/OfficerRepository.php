<?php

namespace App\Repositories\Admin\Officer;

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

    public function getAllOfficersOnlineCount()
    {
        return $this->query->with(['role'])->whereHas('role', function ($role) {
            $role->where('name', 'officer');
        })->where('status', 1)->count();
    }

    public function getAllData()
    {
        return $this->query->with(['images', 'role'])->whereHas('role', function ($role) {
            $role->where('name', 'officer');
        })->orderBy('created_at')->get();
    }

    public function searchDataWithNameOrNip(string $keyword)
    {
        return $this->query->with(['images'])->whereHas('role', function ($query) {
            $query->where('name', 'officer');
        })->where('name', 'LIKE', "%$keyword%")
            ->orWhere('nip', 'LIKE', "%$keyword%")
            ->orderBy('created_at')->get();
    }

    public function createData(array $data)
    {
        return $this->query->create($data);
    }

    public function updateData(User $officer, array $data)
    {
        return $officer->update($data) ? $officer : false;
    }

    public function updateQrCode(User $officer, string $path)
    {
        $officer->qrcode = $path;
        return $officer->save() ? $officer : false;
    }

    public function deleteData(User $officer)
    {
        return $officer->delete();
    }

    public function resetPassword(User $officer, string $password)
    {
        $officer->password = Hash::make($password);
        return $officer->save() ? $officer : false;
    }

    public function updateStatus(User $officer)
    {
        $officer->status = !$officer->status;
        return $officer->save() ? $officer : false;
    }
}
