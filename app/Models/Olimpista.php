<?php

namespace App\Models;

use App\Models\Traits\Casts\EstadoOlimpista;
use App\Models\Traits\Casts\GradoOlimpista;
use App\Models\Traits\Casts\NivelArea;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Olimpista extends Model
{
    use HasFactory;

    protected $table = 'olimpistas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombres',
        'apellido_paterno',
        'apellido_materno',
        'ci',
        'email',
        'fecha_nacimiento',
        'celular',
        'estado',
        'colegio_id',
        'grado_id',
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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'ci' => 'integer',
        'celular' => 'integer',
        'estado' => EstadoOlimpista::class,
    ];

    public function calificacion() { return $this->belongsTo(Calificacion::class, 'olimpista_id'); }

    public function areas() {
        return $this->belongsToMany(Area::class, 'olimpista_areas');
    }

    public function fases() {
        return $this->belongsToMany(Fase::class, 'calificacions')
            ->withPivot('puntaje', 'comentarios');
    }

    public function grupos() {
        return $this->belongsToMany(Grupo::class, 'olimpista_grupos');
    }

    public function colegio() { return $this->belongsTo(Colegio::class); }

    public function tutores() { return $this->belongsToMany(Tutor::class, 'tutor_olimpistas'); }


}
