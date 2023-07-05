<?php

namespace App\Http\Middleware;

use App\Commons\Traits\apiResponse;
use Closure;
use Illuminate\Http\Request;

class HasOfficer
{
    use apiResponse;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->id !== $request->route('officer')->id) {
            return $this->apiSuccess(null, 'Forbidden', 403);
        }

        return $next($request);
    }
}
