<?php

use App\Events\FaseUpdate;
use App\Models\Fase;
use App\Notifications\FaseNotification;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// schedule(function () {
//     $fases = Fase::all();
//     $currentDate = Carbon::now();
//     $fases->each(function ($fase) use ($currentDate) {
//         if ($currentDate >= Carbon::parse($fase->fecha_inicio)) {
//             $fase->update(['estado' => 'en curso']);
//             return;
//         }
//         if ($currentDate >= Carbon::parse($fase->fecha_fin)) {
//             $fase->update(['estado' => 'finalizada']);
//         }
//     });
// })->daily();
