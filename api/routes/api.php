<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Categories\categoryController;
use App\Http\Controllers\PasswordItemController;
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
Route::post('/auth/login', [AuthController::class, 'logn']);
Route::get('/login', function () {
    return new JsonResponse(["message" => "Please login to continue"]);
})->name('login');

Route::middleware('auth:sanctum')->group(function() {
    // Categories
    Route::post('/categories', [categoryController::class, 'newCategory']);
    Route::get('/categories', [categoryController::class, 'index']);
    route::get('/categories/{category}', [categoryController::class, 'show']);
    Route::delete('/categories/{id}', [categoryController::class, 'delete']);
    Route::put('/categories/{id}', [categoryController::class, 'update']);

    // PasswordItems
    Route::get('/passwords', [PasswordItemController::class, 'index']);
    Route::get('/passwords/{passwordItem}', [PasswordItemController::class, 'show']);
    Route::post('/passwords', [PasswordItemController::class, 'store']);
    Route::put('/passwords/{passwordItem}', [PasswordItemController::class, 'update']);
    Route::delete('/passwords/{passwordItem}', [PasswordItemController::class, 'destroy']);
});
