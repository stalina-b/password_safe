<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Categories\categoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\PasswordItemController;
use App\Http\Controllers\Securuity\SecurityCheckController;
use App\Http\Middleware\EnsureMasterPasswordIsValid;
use App\Http\Middleware\EnsurePasswordDoesNotExist;
use App\Http\Middleware\EnsureUnpaidUserHasNotHitPasswordLimit;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/login', function () {
    return json_encode(["message" => "Please login to continue"]);
})->name('login');

Route::middleware('auth:sanctum')->group(function () {
    // Categories
    Route::post('/categories', [categoryController::class, 'newCategory']);
    Route::get('/categories', [categoryController::class, 'index']);
    Route::get('/categories/{category}', [categoryController::class, 'show']);
    Route::delete('/categories/{id}', [categoryController::class, 'delete']);
    Route::put('/categories/{id}', [categoryController::class, 'update']);

    // PasswordItems
    Route::get('/passwords', [PasswordItemController::class, 'index']);

    Route::get('/passwords/{passwordItem}', [PasswordItemController::class, 'show'])
        ->middleware(EnsureMasterPasswordIsValid::class);

    Route::post('/passwords', [PasswordItemController::class, 'store'])
        ->middleware(
            EnsureUnpaidUserHasNotHitPasswordLimit::class,
            EnsureMasterPasswordIsValid::class,
            EnsurePasswordDoesNotExist::class,
        );

    Route::put('/passwords/{passwordItem}', [PasswordItemController::class, 'update'])
        ->middleware(EnsureMasterPasswordIsValid::class, EnsurePasswordDoesNotExist::class);

    Route::delete('/passwords/{passwordItem}', [PasswordItemController::class, 'destroy']);

    //Security check
    Route::post('/security/check', [SecurityCheckController::class, 'checkAllPasswords']);

    // Filter 
    Route::get('/filters', [FilterController::class, 'filter']);

    //User delete
    Route::delete('/auth/delete', [AuthController::class, 'destroy'])
        ->middleware(EnsureMasterPasswordIsValid::class);

    //Logout
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Administrator statistics
    Route::get('/admin/statistics/role', [AdminController::class, 'roleStatistics'])
        ->middleware(EnsureUserIsAdmin::class);

    Route::get('/admin/statistics/date', [AdminController::class, 'usageStatistics'])
        ->middleware(EnsureUserIsAdmin::class);

    Route::get('/admin/statistics/users', [AdminController::class, 'showUsers'])
        ->middleware(EnsureUserIsAdmin::class);
});
