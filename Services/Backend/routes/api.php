<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OfficerController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('login');
        Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    });

    Route::prefix('/dashboard')->group(function() {
        Route::get('/', DashboardController::class);

        Route::prefix('/officer')->group(function() {
            Route::get('/', [OfficerController::class, 'index'])->name('officer.index');
            Route::post('/', [OfficerController::class, 'store'])->name('officer.store');
            Route::get('/{officer}', [OfficerController::class, 'show'])->name('officer.show');
            Route::put('/{officer}', [OfficerController::class, 'update'])->name('officer.update');
            Route::delete('/{officer}', [OfficerController::class, 'destroy'])->name('officer.destroy');
            Route::get('/search', [OfficerController::class, 'search'])->name('officer.search');
        });
    });
});
