<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "usuarios";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'celular',
        'email',
        'password',
        'ci',
        'nivel_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function roles() { return $this->belongsToMany(Rol::class, 'usuario_rols'); }

    public function hasAnyRol(array $roles) { return $this->roles()->whereIn('sigla', $roles)->exists(); }

    public function primerRol() { return $this->roles()->first(); }

    public function areas() { return $this->belongsToMany(Area::class, 'usuario_areas'); }

    public function fases() { return $this->belongsToMany(Fase::class, 'usuario_fases'); }

    public function encargado()
    {
        return $this->hasMany(VerificacionCierre::class, 'usuario_encargado_id');
    }

    public function evaluador()
    {
        return $this->hasMany(VerificacionCierre::class, 'usuario_evaluador_id');
    }

    public function nivel () { return $this->belongsToOne(Nivel::class); }
}
