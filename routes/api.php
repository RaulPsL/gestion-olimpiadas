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

Route::middleware(['api', 'log.requests'])
    ->prefix('olimpistas')->group(function () {
        Route::get('/', [App\Http\Controllers\OlimpistasController::class, 'index'])->name('olimpistas.index');
        Route::post('/', [App\Http\Controllers\OlimpistasController::class, 'store'])->name('olimpistas.store');
        Route::post('/file', [App\Http\Controllers\OlimpistasController::class, 'storeByFile'])->name('olimpistas.storeByFile');
        Route::get('/area/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea'])->name('olimpistas.area');
        Route::get('/fase/{area}/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase'])->name('olimpistas.fase');
        Route::get('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'show'])->name('olimpistas.show');
        Route::put('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'update'])->name('olimpistas.update');
        Route::delete('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'destroy'])->name('olimpistas.destroy');
    });

Route::prefix('usuarios')->group(function () {
    Route::get('/', [App\Http\Controllers\UsuariosController::class, 'index']);
    Route::get('/static', [App\Http\Controllers\UsuariosController::class, 'indexStaticData']);
    Route::get('/{ci}', [App\Http\Controllers\UsuariosController::class, 'show']);
    Route::put('/{ci}', [App\Http\Controllers\UsuariosController::class, 'update']);
    Route::delete('/{ci}', [App\Http\Controllers\UsuariosController::class, 'destroy']);
});

Route::prefix('fases')->group(function () {
    Route::get('/{estado}', [App\Http\Controllers\FasesController::class, 'showByEstado'])->name('fases.estado');
    Route::put('/', [App\Http\Controllers\FasesController::class, 'update'])->name('fases.update');
    Route::delete('/', [App\Http\Controllers\FasesController::class, 'destroy'])->name('fases.destroy');
});

Route::prefix('areas')->group(function () {
    Route::get('/', [App\Http\Controllers\AreasController::class, 'index']);
    Route::post('/', [App\Http\Controllers\AreasController::class, 'store']);
    Route::get('/static', [App\Http\Controllers\AreasController::class, 'indexStaticData']);
    Route::get('/{sigla}', [App\Http\Controllers\AreasController::class, 'show']);
    Route::get('/fases/{sigla}', [App\Http\Controllers\AreasController::class, 'showByFase']);
    Route::put('/{sigla}', [App\Http\Controllers\AreasController::class, 'update']);
    Route::delete('/{sigla}', [App\Http\Controllers\AreasController::class, 'destroy']);
});

Route::prefix('calificaciones')->group(function () {
    Route::post('/{codsis}', [App\Http\Controllers\CalificacionesController::class, 'store']);
    Route::get('/{area}', [App\Http\Controllers\CalificacionesController::class, 'showByArea']);
    Route::get('/{area}/{fase}', [App\Http\Controllers\CalificacionesController::class, 'showByFase']);
    Route::get('/{olimpista}', [App\Http\Controllers\CalificacionesController::class, 'showByOlimpista']);
    Route::put('/{codsis}', [App\Http\Controllers\CalificacionesController::class, 'update']);
});

Route::prefix('clasificaciones')->group(function () {
    Route::get('/', [App\Http\Controllers\ClasificasionController::class, 'index']);
    Route::get('/{area}', [App\Http\Controllers\ClasificasionController::class, 'showByArea']);
});

Route::post('/register', [App\Http\Controllers\UsuariosController::class, 'register']);
Route::post('/login', [App\Http\Controllers\UsuariosController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
