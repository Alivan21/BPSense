<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OfficerController  as AdminOfficerController;
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
    });

    Route::middleware(['auth:api'])->group(function () {
        Route::prefix('dashboard')->middleware(['is-admin'])->group(function() {
            Route::get('/', DashboardController::class);
            
            Route::prefix('officer')->group(function() {
                Route::get('/', [AdminOfficerController::class, 'index'])->name('admin.officer.index');
                Route::post('/', [AdminOfficerController::class, 'store'])->name('admin.officer.store');
                // Route::post('/test/{id}', [AdminOfficerController::class, 'test'])->name('admin.officer.test');
                Route::get('/search', [AdminOfficerController::class, 'search'])->name('admin.officer.search');
                Route::get('/{officer}', [AdminOfficerController::class, 'show'])->name('admin.officer.show');
                Route::put('/{officer}', [AdminOfficerController::class, 'update'])->name('admin.officer.update');
                Route::delete('/{officer}', [AdminOfficerController::class, 'destroy'])->name('admin.officer.destroy');
            });
        });
    
        Route::prefix('officer')->middleware('is-officer')->group(function() {
            Route::get('/', [OfficerController::class, 'index'])->name('officer.show');
            Route::post('/update', [OfficerController::class, 'update'])->name('officer.update');
            Route::post('/password/update', [OfficerController::class, 'updatePassword'])->name('officer.password.update');
            Route::post('/image/update', [OfficerController::class, 'updateImage'])->name('officer.image.update');
        });
    });

    Route::prefix('/user')->group(function() {
        Route::post('/search', [UserController::class, 'searchByNipAndBirthDate'])->name('user.find.input');
        Route::post('/scan-qr-code', [UserController::class, 'scanQrCode'])->name('user.find.qrcode');
        Route::post('/get-images', [UserController::class, 'getImages'])->name('user.image.index');
    });
    
    // Route::get('/test', function() {
    //     // dd($request->file('qrcode'));
    //     // $data = User::findOrFail($id);
    //     // $qrcode = Hash::make($data->id);
    //     $text = bcrypt("Test");
    //     $qrcode = new Generator();
    //     // $image = $qrcode->format('png')->merge('/public/assets/logo/logo.png', 0.35)->generate("Abcde");
    //     $image = $qrcode->size(300)->generate($text);

    //     $path = "qrcode/test.png";
    
    //     Storage::put($path , $image, 'public');
    //     $qrcode_url = Storage::url($path);

    //     return response()->json([
    //         'qrcode' => $text,
    //         'qrcode_url' => $qrcode_url
    //     ]);
    // });

    // Route::get('/test', function() {
    //     $text = bcrypt("Test");
    //     $text = "Test";
    //     $qrcode = new Generator();
    //     $image = $qrcode->format('png')->merge('/public/assets/logo/logog.png')->size(300)->generate($text);
    //     // Mendapatkan informasi path file
    //     // $pathInfo = pathinfo($image);
    //     // dd($pathInfo);
    //     // $extension = $pathInfo['extension'];
    //     // $newFilename = "newfile." . $extension;
    //     // dd($newFilename);
    //     // $path = "qrcode/test.png";

    //     // Pake watermark (Masih Error, Ga bisa diScan)
    //     // // Generate Qr Code Image
    //     // $image = QrCode::format('png')->merge('/public/assets/logo/logo.png', 0.35)->size(300)->generate($officer->id);
    //     // // Langkah 1: Menulis string gambar ke file sementara
    //     $tempFilePath = sys_get_temp_dir() . '/' . uniqid() . '.png';

    //     // // Langkah 2: Convert ke UploadedFile
    //     file_put_contents($tempFilePath, $image);
    //     // $uploadedFile = new UploadedFile($tempFilePath, 'qrcode.png', 'image/png', null, true);
    //     $uploadedFile = new UploadedFile($tempFilePath, 'qrcode.png', 'image/png', null, true);
    //     // // Langkah 3: Upload ke Storage
    //     $path = Storage::putFile('/qrcode', $uploadedFile, 'public');
    //     // // Langkah 4: Hapus file sementara
    //     unlink($tempFilePath);
        
    
    //     // Storage::put($path , $image, 'public');
    //     $qrcode_url = Storage::url($path);

    //     return response()->json([
    //         'qrcode' => $text,
    //         'qrcode_url' => $qrcode_url
    //     ]);
    // });

});
