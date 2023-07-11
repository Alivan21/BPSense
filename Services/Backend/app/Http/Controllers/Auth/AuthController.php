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
        $result = $this->authService->login($request->validated());

        return $this->apiSuccess('Ok',$result, 200);
    }


    public function register(AuthRegisterRequest $request)
    {
        $result = $this->authService->register($request->all());

        return $this->apiSuccess('Ok',$result, 200);
    }

    public function logout(){
        $result = $this->authService->logout();

        return $this->apiSuccess('Ok', $result, 200);
    }
}
