<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menus';

    /**
     * The attributes that are mass assignable.
     *
     * @var array <int, string>
     */
    protected $fillable = [
        'name',
        'url',
        'icon',
        'menu_id',
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
        'menu_id',
    ];

    public function parent(){ return $this->belongsTo(Menu::class); }

    public function children(){ return $this->hasMany(Menu::class); }

    public function roles(){ return $this->belongsToMany(Rol::class, 'rol_menus'); }
}
