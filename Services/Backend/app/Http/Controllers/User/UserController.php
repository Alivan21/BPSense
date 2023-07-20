<?php

namespace App\Http\Controllers\User;

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
        $result = $this->userService->searchByNipAndBirthDate($request->validated());
        switch ($result) {
            case 1:
                return $this->apiSuccess(null, "Inactive", 403);
                break;
            case 2:
                return $this->apiSuccess(null, "Not Found", 404);
                break;
            default:
                return $this->apiSuccess(new OfficerResource($result), "Ok");
                break;
        }
    }

    public function scanQrCode(Request $request)
    {
        $result = $this->userService->scanQrCode($request->key);
        switch ($result) {
            case 1:
                return $this->apiSuccess(null, "Inactive", 403);
                break;
            case 2:
                return $this->apiSuccess(null, "Not Found", 404);
                break;
            default:
                return $this->apiSuccess(new OfficerResource($result), "Ok");
                break;
        }
    }

    public function getImages() 
    {
        return $this->apiSuccess(OfficerResource::collection($this->userService->getOfficerDataSetImages()), "Ok");
    }
}
