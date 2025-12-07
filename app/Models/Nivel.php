<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "nivels";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function grados() {
        return $this->belongsToMany(Grado::class, 'niveles_grados');
    }

    public function area() {
        return $this->belongsToMany(Area::class, 'niveles_areas');
    }
}
