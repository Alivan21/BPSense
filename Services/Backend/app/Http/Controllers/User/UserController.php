<?php

namespace App\Http\Controllers\User;

use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\OfficerResource;
use App\Models\User;
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

    public function searchByNipAndBirthDate(Request $request)
    {
        return $this->apiSuccess(new OfficerResource($this->userService->findOrFailByNipAndBirthDate($request->validate(['nip' => 'required', 'birth_date' => 'required']))), "Ok");
    }

    public function scanQrCode(Request $request)
    {
        return $this->userService->scanQrCode($request->key) ? $this->apiSuccess(new OfficerResource($this->userService->scanQrCode($request->key)), "Ok") : $this->apiSuccess(null, "No Data", 404);
    }

    public function getImages() {
        $user = User::with(['images', 'role'])->whereHas('role', function ($role) {
            $role->where('name', 'officer');
        })->orderBy('created_at')->get();

        return $this->apiSuccess(OfficerResource::collection($user), "Ok");
    }
}
