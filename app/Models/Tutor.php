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
        'referencia',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function olimpistas() { return $this->hasMany(Olimpista::class); }
}
