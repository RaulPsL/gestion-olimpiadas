<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'nombre',
        'tutor_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function areas()
    {
        return $this->belongsToMany(Area::class, 'grupo_areas');
    }

    public function olimpistas()
    {
        return $this->belongsToMany(Olimpista::class, 'olimpista_grupos');
    }

    public function fases() { 
        return $this->belongsToMany(Fase::class, 'calificacion_grupos')
            ->withPivot('puntaje', 'comentarios');
    }

    public function tutor() { return $this->belongsTo(Tutor::class); }

    public function colegio() { return $this->belongsTo(Colegio::class); }
}
