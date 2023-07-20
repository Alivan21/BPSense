<?php

namespace App\Services\User;

use App\Commons\Enums\UserStatusEnum;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function searchByNipAndBirthDate(array $data)
    {
        $result = $this->userRepository->getByNipAndBirthDate($data);

        if ($result) {
            if ($result->status) {
                return $result;
            }
            return UserStatusEnum::ACTIVE->value;
        }

        return UserStatusEnum::INACTIVE->value;
    }

    public function scanQrCode(?string $key)
    {
        if (!$key || $key == "") {
            return UserStatusEnum::INACTIVE->value;
        }

        foreach ($this->userRepository->getAllDataOfficer() as $data) {
            if (Hash::check($data->id, explode("||", $key)[0]) && Hash::check($data->nip, explode("||", $key)[1]) && $data->status) {
                if ($data->status) {
                    return $data;
                }
                return UserStatusEnum::ACTIVE->value;
            }
        }

        return UserStatusEnum::INACTIVE->value;
    }

    public function getOfficerDataSetImages()
    {
        return $this->userRepository->getAllDataOfficer();
    }

}
