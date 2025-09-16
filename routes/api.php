<?php

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

Route::get('/olimpistas', [App\Http\Controllers\OlimpistasController::class, 'index']);
Route::post('/olimpistas', [App\Http\Controllers\OlimpistasController::class, 'store']);
Route::get('/olimpistas/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'show']);
Route::get('/olimpistas/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea']);
Route::get('/olimpistas/{area}/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase']);
Route::put('/olimpistas/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'update']);
Route::delete('/olimpistas/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'destroy']);

Route::get('/usuarios', [App\Http\Controllers\OlimpistasController::class, 'index']);
Route::get('/usuarios/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'show']);
Route::put('/usuarios/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'update']);
Route::delete('/usuarios/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'destroy']);

Route::post('/fases', [App\Http\Controllers\OlimpistasController::class, 'store']);
Route::get('/fases/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea']);
Route::put('/fases/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'update']);
Route::delete('/fases/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'destroy']);

Route::get('/areas', [App\Http\Controllers\OlimpistasController::class, 'index']);
Route::post('/areas', [App\Http\Controllers\OlimpistasController::class, 'store']);
Route::get('/areas/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase']);
Route::put('/areas/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'update']);
Route::delete('/areas/{uuid}', [App\Http\Controllers\OlimpistasController::class, 'destroy']);

Route::get('/calificaciones', [App\Http\Controllers\OlimpistasController::class, 'index']);
Route::get('/calificaciones/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea']);
Route::get('/calificaciones/{area}/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase']);
Route::get('/calificaciones/{olimpista}', [App\Http\Controllers\OlimpistasController::class, 'showByOlimpista']);
Route::post('/calificaciones', [App\Http\Controllers\OlimpistasController::class, 'store']);
Route::put('/calificaciones/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'update']);

Route::get('/clasificaciones', [App\Http\Controllers\OlimpistasController::class, 'index']);
Route::get('/clasificaciones/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea']);
Route::get('/clasificaciones/{area}/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase']);

Route::post('/register', [App\Http\Controllers\OlimpistasController::class, 'register']);
Route::post('/login', [App\Http\Controllers\OlimpistasController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
