<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

//    public function apiResponse(
//        $message = null,
//        $data = null,
//        $statusCode = null,
//    ): JsonResponse {
//        return response()->json([
//            'code' => $statusCode,
//            'message' => $message,
//            'data' => $data,
//        ], $statusCode);
//    }

}
