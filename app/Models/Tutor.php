<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'nombre',
        'apellidos',
        'celular',
        'email',
        'ci',
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

    /**
     * The attributes that should be cast to native types.
     * 
     * @var array
     */
    protected $casts = [
        'celular' => 'integer',
        'ci' => 'integer',
    ];

    public function grupos() { return $this->hasMany(Grupo::class, 'grupos'); }

    public function olimpistas() { return $this->belongsToMany(Olimpista::class, 'tutor_olimpistas'); }
}
