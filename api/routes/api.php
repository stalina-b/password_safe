<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Categories\categoryController;
use App\Http\Controllers\PasswordItemController;
use App\Http\Controllers\Securuity\SecurityCheckController;
use App\Http\Middleware\EnsureMasterPasswordIsValid;
use App\Http\Middleware\EnsurePasswordDoesNotExist;
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
    return new JsonResponse(["message" => "Please login to continue"]);
})->name('login');

Route::middleware('auth:sanctum')->group(function() {
    // Categories
    Route::post('/category', [categoryController::class, 'newCategory']);
    Route::get('/category', [categoryController::class, 'index']);
    Route::delete('/category/{id}', [categoryController::class, 'delete']);
    Route::put('/category/{id}', [categoryController::class, 'update']);

    // PasswordItems
    Route::get('/passwords', [PasswordItemController::class, 'index']);
    Route::get('/passwords/{passwordItem}', [PasswordItemController::class, 'show'])->middleware(EnsureMasterPasswordIsValid::class);
    Route::post('/passwords', [PasswordItemController::class, 'store'])->middleware(EnsureMasterPasswordIsValid::class, EnsurePasswordDoesNotExist::class);
    Route::put('/passwords/{passwordItem}', [PasswordItemController::class, 'update'])->middleware(EnsureMasterPasswordIsValid::class, EnsurePasswordDoesNotExist::class);
    Route::delete('/passwords/{passwordItem}', [PasswordItemController::class, 'destroy']);

    //Security check
    Route::post('/security/check', [SecurityCheckController::class, 'checkAllPasswords']);
});
