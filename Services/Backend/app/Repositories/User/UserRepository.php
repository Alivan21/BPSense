<?php

namespace App\Repositories\User;

use App\Mail\ReportOfficer;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Mail;

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

    public function getByNipAndBirthDate(array $data)
    {
        return $this->query
            ->where('nip', $data['nip'])
            ->where('birth_date', $data['birth_date'])
            ->first();
    }

    public function getAllDataOfficer()
    {
        return $this->query->with(['role', 'images'])->whereHas('role', function ($role) {
            $role->where('name', 'officer');
        })->orderBy('created_at')->get();
    }

    public function updateStatus(int $id)
    {
        $user = $this->query->find($id);
        $user->status = !$user->status;
        return $user->save() ? $user : false;
    }

    public function sendEmail($data)
    {
        return Mail::to('admin@bps.go.id')->send(new ReportOfficer($data['nip'], $data['name'], $data['birthdate'], $data['image'], $data['message']));

    }
}
