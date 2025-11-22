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

Route::prefix('olimpistas')->group(function () {
    Route::get('/', [App\Http\Controllers\OlimpistasController::class, 'index'])->name('olimpistas.index');
    Route::post('/areas', [App\Http\Controllers\OlimpistasController::class, 'indexByArea'])->name('olimpistas.indexByArea');
    Route::get('/static', [App\Http\Controllers\OlimpistasController::class, 'indexStaticData'])->name('olimpistas.index.static');
    Route::post('/', [App\Http\Controllers\OlimpistasController::class, 'store'])->name('olimpistas.store');
    Route::post('/file', [App\Http\Controllers\OlimpistasController::class, 'storeByFile'])->name('olimpistas.storeByFile');
    Route::get('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'show'])->name('olimpistas.show');
    Route::put('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'update'])->name('olimpistas.update');
    Route::delete('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'destroy'])->name('olimpistas.destroy');
});

Route::prefix('grupos')->group(function () {
    Route::get('/', [App\Http\Controllers\OlimpistasController::class, 'index'])->name('grupos.index');
    Route::post('/', [App\Http\Controllers\OlimpistasController::class, 'store'])->name('grupos.store');
    Route::get('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'show'])->name('grupos.show');
    Route::put('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'update'])->name('grupos.update');
    Route::delete('/{ci}', [App\Http\Controllers\OlimpistasController::class, 'destroy'])->name('grupos.destroy');
});

Route::prefix('usuarios')->group(function () {
    Route::post('/', [App\Http\Controllers\UsuariosController::class, 'index']);
    Route::get('/static', [App\Http\Controllers\UsuariosController::class, 'indexStaticData']);
    Route::get('/{ci}', [App\Http\Controllers\UsuariosController::class, 'show']);
    Route::put('/{ci}', [App\Http\Controllers\UsuariosController::class, 'update']);
    Route::delete('/{ci}', [App\Http\Controllers\UsuariosController::class, 'destroy']);
});

Route::prefix('fases')->group(function () {
    Route::post('/', [App\Http\Controllers\FasesController::class, 'index'])->name('fases.ver');
    Route::post('/cierres', [App\Http\Controllers\FasesController::class, 'indexCierreFases'])->name('fases.cierres');
    Route::get('/{estado}', [App\Http\Controllers\FasesController::class, 'showByEstado'])->name('fases.estado');
    Route::put('/create/cierres', [App\Http\Controllers\FasesController::class, 'createCierre'])->name('fases.update');
    Route::put('/update/cierres', [App\Http\Controllers\FasesController::class, 'updateCierre'])->name('fases.create');
    Route::delete('/', [App\Http\Controllers\FasesController::class, 'destroy'])->name('fases.destroy');
});

Route::prefix('areas')->group(function () {
    Route::get('/', [App\Http\Controllers\AreasController::class, 'index']);
    Route::post('/ver/especifico', [App\Http\Controllers\AreasController::class, 'indexByAreas']);
    Route::post('/', [App\Http\Controllers\AreasController::class, 'store']);
    Route::get('/static', [App\Http\Controllers\AreasController::class, 'indexStaticData']);
    Route::get('/{sigla}', [App\Http\Controllers\AreasController::class, 'show']);
    Route::get('/fases/{sigla}', [App\Http\Controllers\AreasController::class, 'showByFase']);
    Route::put('/{sigla}', [App\Http\Controllers\AreasController::class, 'update']);
    Route::delete('/{sigla}', [App\Http\Controllers\AreasController::class, 'destroy']);
});

Route::prefix('calificaciones')->group(function () {
    Route::post('/olimpistas', [App\Http\Controllers\CalificacionesController::class, 'olimpistas']);
    Route::post('/grupos', [App\Http\Controllers\CalificacionesController::class, 'grupos']);
    Route::put('/olimpistas', [App\Http\Controllers\CalificacionesController::class, 'updateOlimpistas']);
    Route::put('/grupos', [App\Http\Controllers\CalificacionesController::class, 'updateGrupos']);
});

Route::prefix('logs')->group(function () {
    Route::post('/calificaciones', [App\Http\Controllers\LogController::class, 'logsCalificaciones']);
    Route::get('/usuarios', [App\Http\Controllers\LogController::class, 'logCierreFases']);
    Route::get('/report/olimpistas', [App\Http\Controllers\LogController::class, 'allUsuarios']);
    Route::get('/report/usuarios', [App\Http\Controllers\LogController::class, 'usuarios']);
    // Route::post('/usuarios', [App\Http\Controllers\LogController::class, 'logCierreFases']);
});

Route::prefix('clasificaciones')->group(function () {
    Route::get('/area', [App\Http\Controllers\ClasificasionController::class, 'indexArea']);
    Route::get('/ganadores', [App\Http\Controllers\ClasificasionController::class, 'ganadores']);
    Route::get('/{area}', [App\Http\Controllers\ClasificasionController::class, 'showByArea']);
});

Route::post('/register', [App\Http\Controllers\UsuariosController::class, 'register']);

Route::get('/calendar', [App\Http\Controllers\FasesController::class, 'indexCalendar']);
Route::get('/statistics', [App\Http\Controllers\LogController::class, 'statistics']);
Route::post('/login', [App\Http\Controllers\UsuariosController::class, 'login']);

// Route::get('/menus', [App\Http\Controllers\MenuController::class, 'index']);
// Route::post('/menus', [App\Http\Controllers\MenuController::class, 'store']);
