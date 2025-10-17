<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $menus = [
            // === BLOQUE: EVALUADOR ===
            ['id' => 1, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-map', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'title' => 'Ver áreas', 'url' => '/areas/ver areas', 'icon' => 'icon-map', 'menu_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'title' => 'Ver fases', 'url' => '/areas/ver fases', 'icon' => 'icon-layers', 'menu_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'title' => 'Calificaciones', 'url' => '/calificaciones', 'icon' => 'icon-clipboard-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'title' => 'Olimpistas', 'url' => '/calificaciones/olimpistas', 'icon' => 'icon-award', 'menu_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'title' => 'Grupos', 'url' => '/calificaciones/grupos', 'icon' => 'icon-users', 'menu_id' => 4, 'created_at' => $now, 'updated_at' => $now],

            // === BLOQUE: ENCARGADO DE ÁREA ===
            ['id' => 7, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-map', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'title' => 'Crear fases', 'url' => '/areas/fases/preparacion de fase', 'icon' => 'icon-plus-circle', 'menu_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'title' => 'Ver áreas', 'url' => '/areas/ver areas', 'icon' => 'icon-map', 'menu_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'title' => 'Ver fases', 'url' => '/areas/ver fases', 'icon' => 'icon-eye', 'menu_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'title' => 'Evaluadores', 'url' => '/evaluadores', 'icon' => 'icon-users', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'title' => 'Ver evaluadores', 'url' => '/evaluadores/ver evaluadores', 'icon' => 'icon-users', 'menu_id' => 11, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'title' => 'Asignar área', 'url' => '/evaluadores/asignar evaluador', 'icon' => 'icon-link', 'menu_id' => 11, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'title' => 'Olimpistas', 'url' => '/olimpistas', 'icon' => 'icon-award', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'title' => 'Inscribir olimpistas', 'url' => '/olimpistas/registrar olimpista(s)', 'icon' => 'icon-user-plus', 'menu_id' => 14, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'title' => 'Inscribir grupos', 'url' => '/olimpistas/registrar grupo(s)', 'icon' => 'icon-users-round', 'menu_id' => 14, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'title' => 'Ver olimpistas', 'url' => '/olimpistas/ver olimpistas', 'icon' => 'icon-award', 'menu_id' => 17, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'title' => 'Ver acciones evaluas', 'url' => '/acciones/evaluadores', 'icon' => 'icon-activity', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],

            // === BLOQUE: ADMINISTRADOR ===
            ['id' => 19, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-map', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 20, 'title' => 'Crear áreas', 'url' => '/areas/crear area', 'icon' => 'icon-map', 'menu_id' => 19, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 21, 'title' => 'Usuarios', 'url' => '/usuarios', 'icon' => 'icon-users', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 22, 'title' => 'Crear encargado', 'url' => '/usuarios/crear-encargado', 'icon' => 'icon-user-plus', 'menu_id' => 21, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 23, 'title' => 'Crear evaluador', 'url' => '/usuarios/crear-evaluador', 'icon' => 'icon-user-check', 'menu_id' => 21, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 24, 'title' => 'Ver acciones de usuarios', 'url' => '/acciones/usuarios', 'icon' => 'icon-list-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
        ];

        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
