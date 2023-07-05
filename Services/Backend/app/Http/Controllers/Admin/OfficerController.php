<?php

namespace App\Http\Controllers\Admin;

use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdmin;
use App\Http\Requests\Admin\Officer\OfficerSearchRequest;
use App\Http\Requests\Admin\Officer\OfficerStoreRequest;
use App\Http\Requests\Admin\Officer\OfficerUpdateRequest;
use App\Http\Resources\OfficerResource;
use App\Models\User;
use App\Services\Admin\OfficerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class OfficerController extends Controller
{
    use apiResponse;
    protected $officerService;

    public function __construct(OfficerService $officerService)
    {
        $this->middleware(CheckAdmin::class)->only(['update', 'show', 'destroy']);
        $this->officerService = $officerService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->apiSuccess(OfficerResource::collection($this->officerService->index()), "Ok");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OfficerStoreRequest $request)
    {
        return $this->apiSuccess(new OfficerResource($this->officerService->store($request->validated(), $request->file('image') ? $request->validate(['image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']) : [])), "Created", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function show(User $officer)
    {
        return $this->apiSuccess(new OfficerResource($officer->loadMissing(['images'])), "Ok");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function update(OfficerUpdateRequest $request, User $officer)
    {
        return $this->officerService->update($officer->loadMissing(['images']), $request->validated(), $request->file('image') ? $request->validate(['image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']) : []) ? $this->apiSuccess(new OfficerResource($this->officerService->update($officer->loadMissing(['images']), $request->validated(), $request->file('image') ? $request->validate(['image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']) : [])), "Updated") : $this->apiError("Gagal Update Data");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $officer)
    {
        return $this->officerService->delete($officer) ? $this->apiSuccess(null, "Deleted", 204) : $this->apiError("Gagal Delete Data");
    }

    public function search(OfficerSearchRequest $request)
    {
        return $this->apiSuccess(OfficerResource::collection($this->officerService->search($request->validated()['keyword'] ?? '')), "Ok");
    }

    public function test(?string $id, Request $request)
    {
        // dd($request->file('qrcode'));
        // $data = User::findOrFail($id);
        // $qrcode = Hash::make($data->id);
        $qrcode = "Test";
        // $image = QrCode::format('png')->merge('/public/assets/logo/logo.png', 0.35)->size(300)->generate($qrcode);
        $image = QrCode::generate($qrcode);

        $path = "qrcode/12.png"; // Generate a unique file name
    
        Storage::put($path , $image, 'public');
        $qrcode_url = Storage::url($path);

        return response()->json([
            'qrcode' => $qrcode,
            'qrcode_url' => $qrcode_url
        ]);
    }
}
