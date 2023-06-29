<?php
    namespace App\Traits;

    use Illuminate\Http\JsonResponse;

    trait apiResponse
        {
            public function apiResponse($message, $data = null, $statusCode = null): JsonResponse
            {
                return response()->json([
                    'code' => $statusCode,
                    'message' => $message,
                    'data' => $data,
                ], $statusCode);
            }

            public function apiSuccess($data = null, $message = null, $statusCode = 200): JsonResponse
            {
                return response()->json([
                    'code' => $statusCode,
                    'data' => $data,
                    'message' => $message,
                ], $statusCode);
            }

            public function apiError($errors): JsonResponse
            {
                $errorMessages = [];

                foreach ($errors->all() as $error) {
                    $errorMessages[] = $error;
                }

                return response()->json([
                    'message' => $errorMessages,
                ]);
            }

    }

