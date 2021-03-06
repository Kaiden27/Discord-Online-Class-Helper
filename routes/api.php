<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\JadwalController;

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

Route::get('/demo-url',  function  (Request $request)  {
    return response()->json(['Laravel 7 CORS Demo']);
 });
 Route::group([
    'middleware' => 'auth:api'
  ], function() {
    Route::post('pengumuman/create',[PengumumanController::class, 'create']);
    Route::get('pengumuman/get', [PengumumanController::class, 'get']);
    Route::get('pengumuman/getUsername', [PengumumanController::class, 'getUsername']);
    Route::post('post/create', [PostController::class, 'create']);
    Route::get('post/get', [PostController::class, 'get']);
    Route::get('post/get/{id}', [PostController::class, 'getSinglePost']);
    Route::post('materi/create', [MateriController::class, 'create']);
    Route::get('materi/get', [MateriController::class, 'get']);
    Route::get('pengumuman/test', [PengumumanController::class, 'test']);
    Route::get('syncedlogin', [AuthController::class, 'syncedLogin']);
    Route::post('jadwal/create', [JadwalController::class, 'create']);

  });

  Route::get('pengumuman/uget', [PengumumanController::class, 'uGet']);
  Route::get('pengumuman/uget/{id}', [PengumumanController::class, 'uGetOne']);
  Route::get('jadwal/get', [JadwalController::class, 'get']);
  Route::get('jadwal/getweb', [JadwalController::class, 'getWeb']);

  Route::post('auth/sync/create', [DiscordController::class, 'create']);

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'register']);
    Route::put('sync/{user}', [AuthController::class, 'sync']);
    
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);

    });
});