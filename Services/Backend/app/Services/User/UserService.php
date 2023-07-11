<?php

namespace App\Services\User;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function findOrFailByNipAndBirthDate(array $data)
    {
        return $this->userRepository->findOrFailByNipAndBirthDate($data);
    }

    public function scanQrCode(?string $key) {
        if (!$key || $key == "") {
            return false;
        }

        foreach ($this->userRepository->getAllDataOfficer() as $data) {
            if (Hash::check($data->id, explode("||", $key)[0]) && Hash::check($data->nip, explode("||", $key)[1])) {
                return $data;
            }
        }

        return false;
    }
}
