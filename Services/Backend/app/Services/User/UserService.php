<?php

namespace App\Services\User;

use App\Models\User;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
class UserService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {

        $this->userRepository = $userRepository;

    }

    public function searchByNipAndName(?string $nip = '', ?string $name = '')
    {
        $nip = $nip ?? '';
        $name = $name ?? '';
        return $this->userRepository->searchByNipAndName($nip, $name);
    }

    public function findOrFailByNip(string $nip)
    {

        return $this->userRepository->findOrFailByNip($nip);
    }

    public function searchByName(string $name)
    {
        return $this->userRepository->searchByName($name);
    }
}
