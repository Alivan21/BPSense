<?php

namespace App\Http\Controllers\User;

use App\Commons\Enums\UserStatusEnum;
use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\SearchNipAndBirthDateRequest;
use App\Http\Resources\User\OfficerResource;
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

    public function searchByNipAndBirthDate(SearchNipAndBirthDateRequest $request)
    {
        return $this->responseCheckOfficer($this->userService->searchByNipAndBirthDate($request->validated()));
    }

    public function scanQrCode(Request $request)
    {
        return $this->responseCheckOfficer($this->userService->scanQrCode($request->key));
    }

    public function getImages()
    {
        return $this->apiSuccess(OfficerResource::collection($this->userService->getOfficerDataSetImages()), "Ok");
    }

    private function responseCheckOfficer($result) {
        if ($result === UserStatusEnum::INACTIVE->value) {
            return $this->apiSuccess(null, "Inactive", 403);
        } else if ($result === UserStatusEnum::NOTFOUND->value) {
            return $this->apiSuccess(null, "Not Found", 404);
        } else {
            return $this->apiSuccess(new OfficerResource($result), "Ok");
        }
    }
}
