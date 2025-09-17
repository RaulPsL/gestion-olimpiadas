<?php

namespace App\Models;

use App\Models\Traits\Casts\EstadoOlimpista;
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
        'codigo_sis',
        'semestre',
        'estado',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'id_usuario',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estado' => EstadoOlimpista::class,
        'semestre' => 'integer',
    ];

    public function calificacion() { return $this->hasMany(Calificacion::class); }

    public function area() {
        return $this->belongsToMany(Area::class, 'olimpista_areas')
            ->withTimestamps();
    }

    public function fase() {
        return $this->belongsToMany(Fase::class, 'calificacions')
            ->withPivot('puntaje', 'comentarios')
            ->withTimestamps();
    }
}
