<?php

use App\Http\Controllers\PasswordItemController;
use App\Http\Controllers\Api\AuthController;
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

Route::get('/passwords', [PasswordItemController::class, 'index']);
Route::get('/passwords/{passwordItem}', [PasswordItemController::class, 'show']);
Route::post('/passwords', [PasswordItemController::class, 'store']);
Route::put('/passwords/{passwordItem}', [PasswordItemController::class, 'update']);
Route::delete('/passwords/{passwordItem}', [PasswordItemController::class, 'delete']);
Route::post('/passwords/getScore', [PasswordItemController::class, 'getScore']);
route::get('/passwords/{passwordItem}/score', [PasswordItemController::class, 'validationScore']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/login', function () {
    return json_encode(["message" => "Please login to continue"]);
})->name('login');
