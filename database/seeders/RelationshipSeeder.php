<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario Roles
        $usuarioRoles = [
            // Evaluadores (usuarios 1-5, 11-15)
            [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
            [11, 1], [12, 1], [13, 1], [14, 1], [15, 1],
            // Encargados de Área (usuarios 6-10, 16-20)
            [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
            [16, 2], [17, 2], [18, 2], [19, 2], [20, 2],
            // Administrador
            [21, 3],
        ];

        foreach ($usuarioRoles as [$usuarioId, $rolId]) {
            DB::table('usuario_rols')->insert([
                'usuario_id' => $usuarioId,
                'rol_id' => $rolId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Usuario Areas
        $usuarioAreas = [
            // Encargados de área
            [6, 1], [6, 6],  // Elena: Robótica e Informática
            [7, 2],          // Pablo: Matemáticas
            [8, 3], [8, 7],  // Lucía: Física y Astronomía
            [9, 4], [9, 5],  // Diego: Química y Biología
            [10, 8],         // Valeria: Electrónica
            [16, 1], [16, 2], // Martín: Robótica y Matemáticas
            [17, 5], [17, 6], // Paola: Biología e Informática
            [18, 4], [18, 3], // Andrés: Química y Física
            [19, 7], [19, 8], // Verónica: Astronomía y Electrónica
            [20, 1], [20, 2], [20, 3], // Hernán: Todas las áreas
            [21, 1], [21, 2], [21, 3], [21, 4], [21, 5], [21, 6], [21, 7], [21, 8], 

            // Evaluadores por área
            [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            [11, 1], [12, 7], [13, 8], [14, 2], [15, 6],
        ];

        foreach ($usuarioAreas as [$usuarioId, $areaId]) {
            DB::table('usuario_areas')->insert([
                'usuario_id' => $usuarioId,
                'area_id' => $areaId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Usuario Fases
        // Usuario Fases
        $usuarioFases = [
            [1, 2], [1, 5], [1, 9],
            [2, 3], [2, 7],
            [3, 1], [3, 8], [3, 15],
            [4, 4], [4, 10],
            [5, 6], [5, 11], [5, 12],
            [6, 13], [6, 16],
            [7, 17], [7, 18], [7, 19],
            [8, 14], [8, 20],
            [9, 21], [9, 22],
            [10, 23],
            [11, 1], [11, 24],
            [12, 25], [12, 26], [12, 27],
            [13, 28], [13, 29],
            [14, 30],
            [15, 31], [15, 32],
            [16, 5],
            [17, 8], [17, 11],
            [18, 10], [18, 14],
            [19, 13], [19, 19],
            [20, 22], [20, 27],
        ];

        foreach ($usuarioFases as [$usuarioId, $faseId]) {
            DB::table('usuario_fases')->insert([
                'usuario_id' => $usuarioId,
                'fase_id' => $faseId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Olimpista Grupos
        $olimpistaGrupos = [
            [1, 1], [7, 1], [21, 1],    // Grupo Alfa
            [2, 2], [8, 2],             // Grupo Beta
            [3, 3], [13, 3], [23, 3],   // Grupo Gamma
            [4, 4], [14, 4],            // Grupo Delta
            [5, 5], [15, 5], [25, 5],   // Grupo Épsilon
            [6, 6], [16, 6],            // Grupo Zeta
            [31, 7], [37, 7], [41, 7],  // Grupo Eta
            [32, 8], [38, 8],           // Grupo Theta
            [33, 9], [43, 9], [49, 9],  // Grupo Iota
            [34, 10], [44, 10],         // Grupo Kappa
        ];

        foreach ($olimpistaGrupos as [$olimpistaId, $grupoId]) {
            DB::table('olimpista_grupos')->insert([
                'olimpista_id' => $olimpistaId,
                'grupo_id' => $grupoId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Olimpista Areas
        $olimpistaAreas = [
            // Asignaciones por área
            [1, 1], [2, 1], [31, 1], [32, 1], [33, 1], [17, 1], [18, 1], [19, 1], [20, 1], // Robótica
            [3, 2], [4, 2], [34, 2], [35, 2], [36, 2], [21, 2], [21, 6], [22, 2], [24, 2], [26, 2], [28, 2], [49, 2], [49, 4], // Matemáticas
            [5, 3], [6, 3], [37, 3], [38, 3], [39, 3], [29, 3], [30, 3], [36, 3], [39, 3], [31, 3], [31, 7], // Física
            [7, 4], [8, 4], [40, 4], [41, 4], [42, 4], [40, 4], [42, 4], [47, 4], [48, 4], [49, 4], // Química
            [9, 5], [10, 5], [43, 5], [44, 5], [45, 5], [53, 5], [54, 5], [55, 5], [56, 5], [41, 5], [17, 5], // Biología
            [11, 6], [12, 6], [46, 6], [47, 6], [48, 6], [33, 6], [33, 8], [57, 6], [58, 6], [59, 6], [60, 6], // Informática
            [13, 7], [14, 7], [49, 7], [50, 7], [51, 7], [27, 7], [35, 7], [44, 7], [50, 7], // Astronomía
            [15, 8], [16, 8], [52, 8], [53, 8], [54, 8], [25, 8], [38, 8], [45, 8], [52, 8], // Electrónica
        ];

        foreach ($olimpistaAreas as [$olimpistaId, $areaId]) {
            DB::table('olimpista_areas')->insert([
                'olimpista_id' => $olimpistaId,
                'area_id' => $areaId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Tutor Académico Olimpistas
        $tutorAcademicoOlimpistas = [
            [1, 1], [1, 7], [1, 21], [1, 11],
            [2, 2], [2, 8], [2, 21], [2, 12],
            [3, 3], [3, 13], [3, 23],
            [4, 4], [4, 14],
            [5, 5], [5, 15],
            [6, 31], [6, 37], [6, 41], [6, 16],
            [7, 32], [7, 38], [7, 41], [7, 17],
            [8, 33], [8, 43], [8, 33], [8, 18],
            [9, 34], [9, 44], [9, 19],
            [10, 35], [10, 45], [10, 33], [10, 20],
        ];

        foreach ($tutorAcademicoOlimpistas as [$tutorAcademicoId, $olimpistaId]) {
            DB::table('tutor_academico_olimpistas')->insert([
                'tutor_academico_id' => $tutorAcademicoId,
                'olimpista_id' => $olimpistaId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Crear Calificaciones para fases preliminares
        $calificaciones = [];
        $olimpistaAreas = DB::table('olimpista_areas')->get();
        
        foreach ($olimpistaAreas as $oa) {
            $fases = DB::table('fases')
                ->where('area_id', $oa->area_id)
                ->where('tipo_fase', 'preliminares')
                ->get();
                
            foreach ($fases as $fase) {
                $calificaciones[] = [
                    'puntaje' => 0.00,
                    'comentarios' => '',
                    'olimpista_id' => $oa->olimpista_id,
                    'fase_id' => $fase->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        if (!empty($calificaciones)) {
            DB::table('calificacions')->insert($calificaciones);
        }

        // Crear Grupo Areas automáticamente
        $grupoAreas = DB::select("
            SELECT DISTINCT og.grupo_id, oa.area_id
            FROM olimpista_grupos og
            JOIN olimpista_areas oa ON oa.olimpista_id = og.olimpista_id
        ");

        foreach ($grupoAreas as $ga) {
            DB::table('grupo_areas')->insertOrIgnore([
                'grupo_id' => $ga->grupo_id,
                'area_id' => $ga->area_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Crear Calificación Grupos para fases preliminares
        $calificacionGrupos = [];
        $grupoAreasData = DB::table('grupo_areas')->get();
        
        foreach ($grupoAreasData as $ga) {
            $fases = DB::table('fases')
                ->where('area_id', $ga->area_id)
                ->where('tipo_fase', 'preliminares')
                ->get();
                
            foreach ($fases as $fase) {
                $calificacionGrupos[] = [
                    'puntaje' => 0.00,
                    'comentarios' => '',
                    'grupo_id' => $ga->grupo_id,
                    'fase_id' => $fase->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        if (!empty($calificacionGrupos)) {
            DB::table('calificacion_grupos')->insert($calificacionGrupos);
        }

        $rolesUsuarioData = [
            [1,1],[1,4],[1,7],[1,18],
            [2,8],[2,12],[2,15],[2,19],[2,20],
            [3,18],[3,21],[3,23],[3,26],[3,27], [3,28]];
        foreach ($rolesUsuarioData as [$rolId, $menuId]) {
            DB::table('rol_menus')->insert([
                'rol_id' => $rolId,
                'menu_id' => $menuId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
