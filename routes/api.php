<?php

use App\Http\Middleware\LogRequests;
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
        Route::get('/area/{area}', [App\Http\Controllers\OlimpistasController::class, 'showByArea'])->name('olimpistas.area');
        Route::get('/fase/{area}/{fase}', [App\Http\Controllers\OlimpistasController::class, 'showByFase'])->name('olimpistas.fase');
        Route::get('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'show'])->name('olimpistas.show');
        Route::put('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'update'])->name('olimpistas.update');
        Route::delete('/{codsis}', [App\Http\Controllers\OlimpistasController::class, 'destroy'])->name('olimpistas.destroy');
    });

Route::prefix('usuarios')->group(function () {
    Route::get('/', [App\Http\Controllers\UsuariosController::class, 'index']);
    Route::get('/{uuid}', [App\Http\Controllers\UsuariosController::class, 'show']);
    Route::put('/{uuid}', [App\Http\Controllers\UsuariosController::class, 'update']);
    Route::delete('/{uuid}', [App\Http\Controllers\UsuariosController::class, 'destroy']);
});

Route::prefix('fases')->group(function () {
    Route::post('/fases', [App\Http\Controllers\FasesController::class, 'store']);
    Route::get('/fases/{area}', [App\Http\Controllers\FasesController::class, 'showByArea']);
    Route::put('/fases/{uuid}', [App\Http\Controllers\FasesController::class, 'update']);
    Route::delete('/fases/{uuid}', [App\Http\Controllers\FasesController::class, 'destroy']);
});

Route::prefix('areas')->group(function () {
    Route::get('/', [App\Http\Controllers\AreasController::class, 'index']);
    Route::post('/', [App\Http\Controllers\AreasController::class, 'store']);
    Route::get('/{fase}', [App\Http\Controllers\AreasController::class, 'showByFase']);
    Route::put('/{uuid}', [App\Http\Controllers\AreasController::class, 'update']);
    Route::delete('/{uuid}', [App\Http\Controllers\AreasController::class, 'destroy']);
});

Route::prefix('calasificaciones')->group(function () {
    Route::get('/', [App\Http\Controllers\CalificacionesController::class, 'index']);
    Route::get('/{area}', [App\Http\Controllers\CalificacionesController::class, 'showByArea']);
    Route::get('/{area}/{fase}', [App\Http\Controllers\CalificacionesController::class, 'showByFase']);
    Route::get('/{olimpista}', [App\Http\Controllers\CalificacionesController::class, 'showByOlimpista']);
    Route::post('/', [App\Http\Controllers\CalificacionesController::class, 'store']);
    Route::put('/{codsis}', [App\Http\Controllers\CalificacionesController::class, 'update']);
});

Route::prefix('clasificaciones')->group(function () {
    Route::get('/', [App\Http\Controllers\ClasificasionController::class, 'index']);
    Route::get('/{area}', [App\Http\Controllers\ClasificasionController::class, 'showByArea']);
    Route::get('/{area}/{fase}', [App\Http\Controllers\ClasificasionController::class, 'showByFase']);
});

Route::post('/register', [App\Http\Controllers\OlimpistasController::class, 'register']);
Route::post('/login', [App\Http\Controllers\OlimpistasController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
