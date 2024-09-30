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
#----------------------------CREDITS---------------------------------#
Route::post('/update_Credits', [UsersController::class, 'updateCredits'])->middleware('auth:sanctum');
Route::get('/totalcreditswon', [UsersController::class, 'totalCreditsWon'])->middleware('auth:sanctum');
Route::get('/users/{id}/total_credits_won', [UsersController::class, 'totalCreditsWon'])->middleware('auth:sanctum');
Route::get('/users/{id}/total_credits_lose', [UsersController::class, 'totalCreditsLose'])->middleware('auth:sanctum');
#----------------------------LEADERBOARD---------------------------------#

Route::get('/leaderboard', [UsersController::class, 'leaderBoardWins']);

#-------------------------------------BANK ACCOUNT----------------------------------#
Route::resource('/bank_accounts', bankAccountController::class)->middleware('auth:sanctum');
#-------------------------------------GAME----------------------------------#
Route::resource('/game', GameController::class);
#-------------------------------------MATCH----------------------------------#
Route::resource('/match', MatchController::class)->middleware('auth:sanctum');
Route::post('/create_match', [MatchController::class, 'create_match']);
Route::post('/join_match', [MatchController::class, 'join_match']);

