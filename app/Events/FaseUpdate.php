<?php

namespace App\Events;

use App\Models\Fase;
use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FaseUpdate
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('local'),
        ];
    }

    public function broadcastAs()
    {
        $fases = Fase::all()->filter(function ($fase) {
            return $fase->fecha_inicio >= Carbon::today() && 
            $fase->fecha_fin <= Carbon::today()->endOfDay();
        })->groupBy('nivel_id');

        $primeras_fases = $fases->map(function ($nivel_fases) { return $nivel_fases->first();});

        $primeras_fases->each(function ($fase) { $fase->update(['estado' => 'en curso']); });
        return 'my-event';
    }
}
