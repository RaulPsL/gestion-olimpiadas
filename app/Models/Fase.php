<?php

namespace App\Models;

use App\Models\Traits\Casts\EstadoFase;
use App\Models\Traits\Casts\TipoFase;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fase extends Model
{
    use HasFactory;

    protected $table = "fases";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'tipo_fase',
        'sigla',
        'descripcion',
        'cantidad_max_participantes',
        'cantidad_min_participantes',
        'estado',
        'fecha_inicio',
        'fecha_fin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'id_area',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime',
        'estado' => EstadoFase::class,
        'tipo_fase' => TipoFase::class,
        'cantidad_max_participantes' => 'integer',
        'cantidad_min_participantes' => 'integer',
    ];

    public function area() { return $this->belongsTo(Area::class); }

    public function calificacions() { return $this->hasMany(Calificacion::class); }

    public function olimpistas() {
        return $this->belongsToMany(Olimpista::class, 'calificacions')
            ->withPivot('puntaje', 'comentarios');
    }
}
