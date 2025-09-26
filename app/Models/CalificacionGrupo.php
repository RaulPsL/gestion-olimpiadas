<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalificacionGrupo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'puntaje',
        'comentarios',
    ];

    protected $hidden = [
        'id',
        'grupo_id',
        'fase_id',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'puntaje' => 'float',
        'comentarios' => 'string',
    ];

    public function grupo() { return $this->belongsTo(Grupo::class); }

    public function fase() { return $this->belongsTo(Fase::class); }
}
