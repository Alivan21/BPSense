<?php

namespace App\Http\Controllers\Auth;

use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    use apiResponse;
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
        return $this->apiSuccess('Ok', $this->authService->login($request->validated()), 200);
    }


    public function register(AuthRegisterRequest $request)
    {
        return $this->apiSuccess('Ok', $this->authService->register($request->all()), 200);
    }

    public function logout(){
        return $this->apiSuccess('Ok', $this->authService->logout(), 200);
    }
}
