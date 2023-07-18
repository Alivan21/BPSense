<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $credentials = $request->validate([
            'identifier' => 'required', 
            'password' => 'required|min:8'
        ]);

        if (is_numeric($credentials['identifier']) && $credentials['identifier']) {
            $credentials['nip'] = $credentials['identifier'];
        } else {
            $credentials['username'] = $credentials['identifier'];
        }

        unset($credentials['identifier']);

        // codeium set token jwt when auth attempt true and set expired date token is tomorrow
        if ($token = auth()->attempt($credentials, ['exp' => Carbon::now()->addDays(1)->timestamp])) {
            return response()->json([
                'user' => auth()->user(),
                'token' => $token
            ]);
        } else {
            return response()->json([
                'message' => 'Credentials not valid'
            ], 401);
        }
    }
}
