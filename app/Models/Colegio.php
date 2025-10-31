<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'provincia_id',
    ];

    public function olimpistas() { return $this->hasMany(Olimpista::class); }

    public function provincia() { return $this->belongsTo(Provincia::class); }

}
