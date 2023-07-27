<?php

namespace App\Http\Controllers\Admin;

use App\Commons\Traits\apiResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\OfficerService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use apiResponse;
    protected $officerService;

    public function __construct(OfficerService $officerService)
    {
        $this->officerService = $officerService;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return $this->apiSuccess($this->officerService->dashboard(), "Ok");
    }
}
