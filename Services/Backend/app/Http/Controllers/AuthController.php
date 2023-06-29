<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

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
        $result = $this->authService->login($request->all());

        return $this->apiResponse('User berhasil login',$result, 200);
    }


    public function register(AuthRegisterRequest $request)
    {
        $result = $this->authService->register($request->all());

        return $this->apiResponse('User berhasil dibuat',$result, 200);
    }
}
