<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioInterno extends Model
{
    use HasFactory;

    protected $table = "usuario_internos";

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'id_usuario',
        'id_rol',
    ];

    public function usuario() { return $this->belongsTo(Usuario::class); }

    public function rol() { return $this->belongsToMany(Rol::class); }
}
