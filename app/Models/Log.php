<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $table = 'log_data';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'usuario_id',
        'accion',
        'tabla',
        'calificacion_id',
        'olimpista_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'usuario_id',
        'olimpista_id',
    ];

    public function usuario() {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function olimpista() {
        return $this->belongsTo(Olimpista::class, 'olimpista_id');
    }

    public function calificacion() {
        return $this->belongsTo(Calificacion::class, 'calificacion_id');
    }
}
