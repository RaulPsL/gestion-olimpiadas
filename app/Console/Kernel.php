<?php

namespace App\Console;

use App\Models\Fase;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            $fases = Fase::all();
            $currentDate = Carbon::now();
            $fases->each(function ($fase) use ($currentDate) {
                if ($currentDate >= Carbon::parse($fase->fecha_inicio) && $currentDate >= Carbon::parse($fase->fecha_fin)) {
                    $fase->update(['estado' => 'finalizada']);
                }
                if ($currentDate >= Carbon::parse($fase->fecha_inicio)) {
                    $fase->update(['estado' => 'en curso']);
                    return;
                }
            });
        })->daily();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
