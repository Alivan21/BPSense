<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OfficerController as AdminOfficerController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Officer\OfficerController;
use App\Http\Controllers\User\UserController;
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
        Route::post('login', [AuthController::class, 'login'])->middleware('guest')->name('login');
        // Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
        Route::post('get-profile', [AuthController::class, 'getProfile'])->middleware('auth:api')->name('get-profile');
    });

    Route::middleware(['auth:api'])->group(function () {
        Route::prefix('dashboard')->middleware(['is-admin'])->group(function () {
            Route::get('/', DashboardController::class);

            Route::prefix('officer')->group(function () {
                Route::get('/', [AdminOfficerController::class, 'index'])->name('admin.officer.index');
                Route::post('/', [AdminOfficerController::class, 'store'])->name('admin.officer.store');
                Route::get('/search', [AdminOfficerController::class, 'search'])->name('admin.officer.search');
                Route::put('/reset/password/{officer}', [AdminOfficerController::class, 'resetPassword'])->name('admin.officer.reset.password');
                Route::put('/update/status/{officer}', [AdminOfficerController::class, 'updateStatus'])->name('admin.officer.update.status');
                Route::get('/{officer}', [AdminOfficerController::class, 'show'])->name('admin.officer.show');
                Route::put('/{officer}', [AdminOfficerController::class, 'update'])->name('admin.officer.update');
                Route::delete('/{officer}', [AdminOfficerController::class, 'destroy'])->name('admin.officer.destroy');
            });
        });

        Route::prefix('officer')->middleware('is-officer')->group(function () {
            Route::get('/', [OfficerController::class, 'index'])->name('officer.show');
            Route::post('/update', [OfficerController::class, 'update'])->name('officer.update');
            Route::put('/password/update', [OfficerController::class, 'updatePassword'])->name('officer.password.update');
            Route::post('/image/update', [OfficerController::class, 'updateImage'])->name('officer.image.update');

        });
    });

    Route::prefix('/user')->group(function () {
        Route::post('/search', [UserController::class, 'searchByNipAndBirthDate'])->name('user.find.input');
        Route::post('/scan-qr-code', [UserController::class, 'scanQrCode'])->name('user.find.qrcode');
        Route::post('/get-images', [UserController::class, 'getImages'])->name('user.image.index');
        Route::post('/send-report-email', [UserController::class, 'sendReportEmail'])->name('user.send.report.email');
    });
});

// Route::prefix('petugas')->group(function () {
//     Route::get('/', [AdminOfficerController::class, 'index'])->name('admin.officer.index');
//     Route::post('/', [AdminOfficerController::class, 'store'])->name('admin.officer.store');
//     Route::get('/search', [AdminOfficerController::class, 'search'])->name('admin.officer.search');
//     Route::put('/reset/password/{officer}', [AdminOfficerController::class, 'resetPassword'])->name('admin.officer.reset.password');
//     Route::put('/update/status/{officer}', [AdminOfficerController::class, 'update(Status'])->name('admin.officer.update.status');
//     Route::get('/{officer}', [AdminOfficerController::class, 'show'])->name('admin.officer.show');
//     Route::put('/{officer}', [AdminOfficerController::class, 'update'])->name('admin.officer.update');
//     Route::delete('/{officer}', [AdminOfficerController::class, 'destroy'])->name('admin.officer.destroy');
// });
