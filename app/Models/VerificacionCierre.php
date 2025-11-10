<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificacionCierre extends Model
{
    use HasFactory;

    protected $table = "verificacion_cierres";

    protected $fillable = [
        'usuario_encargado_id',
        'usuario_evaluador_id',
        'fase_id'
    ];
    
    // Relación con el creador
    public function encargado()
    {
        return $this->belongsTo(Usuario::class, 'usuario_encargado_id');
    }
    
    // Relación con el asignado
    public function evaluador()
    {
        return $this->belongsTo(Usuario::class, 'usuario_evaluador_id');
    }

    public function fase()
    {
        return $this->belongsTo(Fase::class);
    }
}
