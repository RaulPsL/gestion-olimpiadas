<?php

namespace App\Models;

use App\Models\Traits\Casts\NivelArea;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = "areas";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'sigla',
        'descripcion',
        'nivel',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'nivel' => NivelArea::class,
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

    public function fases() { return $this->hasMany(Fase::class); }

    public function niveles() { return $this->belongsToMany(Nivel::class, 'niveles_areas'); }

    public function primeraFase() { return $this->fases()->first(); }

    public function olimpistas() {
        return $this->belongsToMany(Olimpista::class, 'olimpista_areas'); 
    }

    public function grupos() { return $this->belongsToMany(Grupo::class, 'grupo_areas'); }

    public function usuarios() { return $this->belongsToMany(Usuario::class, 'usuario_areas');}

}
