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
            ['id' => 1, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-goal', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'title' => 'Ver áreas', 'url' => '/areas/ver areas', 'icon' => 'icon-map', 'menu_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'title' => 'Ver fases', 'url' => '/areas/ver fases', 'icon' => 'icon-layers', 'menu_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'title' => 'Calificaciones', 'url' => '/calificaciones', 'icon' => 'icon-clipboard-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'title' => 'Olimpistas', 'url' => '/calificaciones/olimpistas', 'icon' => 'icon-award', 'menu_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'title' => 'Grupos', 'url' => '/calificaciones/grupos', 'icon' => 'icon-users', 'menu_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'title' => 'Cerrar de fases', 'url' => '/fases/cierre de fase', 'icon' => 'ti ti-lock-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],

            // === BLOQUE: ENCARGADO DE ÁREA ===
            ['id' => 8, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-goal', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'title' => 'Crear fases', 'url' => '/areas/fases/preparacion de fase', 'icon' => 'icon-circle-fading-plus', 'menu_id' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'title' => 'Ver áreas', 'url' => '/areas/ver areas', 'icon' => 'icon-map', 'menu_id' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'title' => 'Ver fases', 'url' => '/areas/ver fases', 'icon' => 'icon-eye', 'menu_id' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'title' => 'Evaluadores', 'url' => '/evaluadores', 'icon' => 'icon-users', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'title' => 'Ver evaluadores', 'url' => '/evaluadores/ver evaluadores', 'icon' => 'icon-user-check', 'menu_id' => 12, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'title' => 'Asignar área', 'url' => '/evaluadores/asignar evaluador', 'icon' => 'icon-link', 'menu_id' => 12, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'title' => 'Olimpistas', 'url' => '/olimpistas', 'icon' => 'icon-award', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'title' => 'Inscribir olimpistas', 'url' => '/olimpistas/registrar olimpista(s)', 'icon' => 'icon-user-plus', 'menu_id' => 15, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'title' => 'Inscribir grupos', 'url' => '/olimpistas/registrar grupo(s)', 'icon' => 'icon-users-round', 'menu_id' => 15, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'title' => 'Ver olimpistas', 'url' => '/olimpistas/ver olimpistas', 'icon' => 'icon-award', 'menu_id' => 15, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 19, 'title' => 'Ver acciones de evaluadores', 'url' => '/acciones/evaluadores', 'icon' => 'icon-activity', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 20, 'title' => 'Cerrar de fases', 'url' => '/fases/cierre de fase', 'icon' => 'ti ti-lock-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],

            // === BLOQUE: ADMINISTRADOR ===
            ['id' => 21, 'title' => 'Áreas', 'url' => '/areas', 'icon' => 'icon-goal', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 22, 'title' => 'Crear áreas', 'url' => '/areas/crear area', 'icon' => 'icon-map-plus', 'menu_id' => 21, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 23, 'title' => 'Usuarios', 'url' => '/usuarios', 'icon' => 'icon-users', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 24, 'title' => 'Crear encargado', 'url' => '/usuarios/crear-encargado', 'icon' => 'icon-user-plus', 'menu_id' => 23, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 25, 'title' => 'Crear evaluador', 'url' => '/usuarios/crear-evaluador', 'icon' => 'icon-user-check', 'menu_id' => 23, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 26, 'title' => 'Ver acciones de usuarios', 'url' => '/acciones/usuarios', 'icon' => 'icon-list-check', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 27, 'title' => 'Ver fases finalizadas', 'url' => '/fases/ver cierres', 'icon' => 'ti ti-adjustments-x', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],        
            ['id' => 28, 'title' => 'Generar reportes', 'url' => '/reportes/generar', 'icon' => 'ti ti-news', 'menu_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 29, 'title' => 'Ver áreas', 'url' => '/areas/ver areas', 'icon' => 'icon-map', 'menu_id' => 21, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 30, 'title' => 'Ver fases', 'url' => '/areas/ver fases', 'icon' => 'icon-layers', 'menu_id' => 21, 'created_at' => $now, 'updated_at' => $now],
        ];

        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
