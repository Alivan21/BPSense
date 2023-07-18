<?php

namespace App\Http\Controllers\Officer;

use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Officer\OfficerImageRequest;
use App\Http\Requests\Officer\OfficerPasswordRequest;
use App\Http\Requests\Officer\OfficerUpdateRequest;
use App\Http\Resources\OfficerResource;
use App\Services\Officer\OfficerService;

class OfficerController extends Controller
{
    use apiResponse;
    protected $officerService;

    public function __construct(OfficerService $officerService)
    {
        // $this->middleware(['check-admin', 'has-officer'])->only(['update']);
        $this->officerService = $officerService;
    }

    public function index()
    {
        return $this->apiSuccess(new OfficerResource(auth()->user()), "Ok");
    }

    public function update(OfficerUpdateRequest $request)
    {
        return $this->officerService->update(auth()->user(), $request->validated()) ? $this->apiSuccess(new OfficerResource(auth()->user(), $request->validated()), "Data Updated") : $this->apiError("Gagal Update Data");
    }

    public function updateImage(OfficerImageRequest $request)
    {
        return $this->officerService->updateDataSetImages(auth()->user(), $request->validated()) ? $this->apiSuccess(new OfficerResource(auth()->user()), "Gambar Dataset Updated") : $this->apiError("Gagal Update Gambar Dataset");
    }

    public function updatePassword(OfficerPasswordRequest $request)
    {
        return $this->officerService->updatePassword(auth()->user(), $request->validated()) ? $this->apiSuccess(new OfficerResource(auth()->user()), "Password Updated") : $this->apiError("Gagal Update Password");
    }
}
