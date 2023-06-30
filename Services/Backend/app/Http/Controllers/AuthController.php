<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
    use ApiResponse;
    /**
     * @var authService
     */
    protected $authService;

    /**
     * AuthController Constructor
     *
     * @param AuthService $authService
     *
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(AuthLoginRequest $request)
    {
        $result = $this->authService->login($request->only('nip', 'password'));

        if (!$result) {
            return $this->apiResponse('Login gagal, Email/password anda salah', null, 401);
        }

        return $this->apiResponse('User berhasil login',$result, 200);
    }


    public function register(AuthRegisterRequest $request)
    {
        $result = $this->authService->register($request->all());

        return $this->apiResponse('User berhasil dibuat',$result, 200);
    }

    public function logout(){
        $result = $this->authService->logout();

        return $this->apiResponse('User berhasil logout',$result, 200);
    }
}
