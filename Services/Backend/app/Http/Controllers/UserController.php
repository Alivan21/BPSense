<?php

namespace App\Http\Controllers;

use App\Commons\Traits\apiResponse;
use App\Http\Resources\User\UserResource;
use App\Services\User\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use apiResponse;
    protected $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function findNip(Request $request)
    {
        $nip = $request->nip;

        $data = $this->userService->findOrFailByNip($nip);

        return $this->apiSuccess("OK", new UserResource($data));
    }
}
