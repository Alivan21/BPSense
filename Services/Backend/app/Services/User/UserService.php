<?php

namespace App\Services\User;

use App\Commons\Enums\UserStatusEnum;
use App\Repositories\Storage\StorageRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository, $storageRepository;

    public function __construct(UserRepositoryInterface $userRepository, StorageRepositoryInterface $storageRepository)
    {
        $this->userRepository = $userRepository;
        $this->storageRepository = $storageRepository;
    }

    public function searchByNipAndBirthDate(array $data)
    {
        $result = $this->userRepository->getByNipAndBirthDate($data);

        if ($result) {
            if ($result->status) {
                return $result;
            }
            return UserStatusEnum::INACTIVE->value;
        }

        return UserStatusEnum::NOTFOUND->value;
    }

    public function scanQrCode(?string $key)
    {
        if (!$key || $key == "") {
            return UserStatusEnum::NOTFOUND->value;
        }

        foreach ($this->userRepository->getAllDataOfficer() as $data) {
            if (Hash::check($data->id, explode("||", $key)[0]) && Hash::check($data->nip, explode("||", $key)[1]) && $data->status) {
                if ($data->status) {
                    return $data;
                }
                return UserStatusEnum::INACTIVE->value;
            }
        }

        return UserStatusEnum::NOTFOUND->value;
    }

    public function getOfficerDataSetImages()
    {
        return $this->userRepository->getAllDataOfficer();
    }

    public function sendEmail(array $data)
    {
        $imagePath = $this->storageRepository->putFile(hash('sha256', $data['nip']), $data['image'], 'public');
        $data['image'] = $imagePath;

        $this->userRepository->sendEmail($data);

        return true;
    }
}
