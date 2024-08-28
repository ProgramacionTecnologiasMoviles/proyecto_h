<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\bankAccountController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\Api\AuthController;

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

Route::post('/login', [AuthController::class,'iniciarsesion']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return "token eliminado";
    });

});

Route::post('/users', [UsersController::class,'store']);
Route::put('/users/{id}', [UsersController::class,'update'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [UsersController::class,'destroy'])->middleware('auth:sanctum');
#-------------------------------------BANK ACCOUNT----------------------------------#
Route::resource('/bank_accounts', bankAccountController::class);
#-------------------------------------GAME----------------------------------#
Route::resource('/Game', GameController::class);

