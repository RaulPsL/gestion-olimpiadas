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
            [16, 1], [16, 2], // Martín: Robótica y Matemáticas
            [17, 5], [17, 6], // Paola: Biología e Informática
            [18, 4], [18, 3], // Andrés: Química y Física
            [19, 7], // Verónica: Astronomía y Electrónica
            [20, 1], [20, 2], [20, 3], // Hernán: Todas las áreas
            [21, 1], [21, 2], [21, 3], [21, 4], [21, 5], [21, 6], [21, 7],

            // Evaluadores por área
            [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
            [11, 1], [12, 7], [14, 2], [15, 6],
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
            [11, 6], [12, 6], [46, 6], [47, 6], [48, 6], [33, 6], [33, 6], [57, 6], [58, 6], [59, 6], [60, 6], // Informática
            [13, 7], [14, 7], [49, 7], [50, 7], [51, 7], [27, 7], [35, 7], [44, 7], [50, 7], // Astronomía
            [15, 1], [16, 2], [52, 3], [53, 4], [54, 5], [25, 6], [38, 7], [45, 1], [52, 2],
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
            DB::table('tutor_olimpistas')->insert([
                'tutor_id' => $tutorAcademicoId,
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
            WHERE oa.area_id = 4 and oa.area_id = 7
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

        $gradoNivel = [
            // ASTRONOMÍA - ASTROFÍSICA
            // Nivel: 3P (id: 1) -> 3ro Primaria (grado_id: 1)
            [1, 1],
            
            // Nivel: 4P (id: 2) -> 4to Primaria (grado_id: 2)
            [2, 2],
            
            // Nivel: 5P (id: 3) -> 5to Primaria (grado_id: 3)
            [3, 3],
            
            // Nivel: 6P (id: 4) -> 6to Primaria (grado_id: 4)
            [4, 4],
            
            // Nivel: 1S (id: 5) -> 1ro Secundaria (grado_id: 5)
            [5, 5],
            
            // Nivel: 2S (id: 6) -> 2do Secundaria (grado_id: 6)
            [6, 6],
            
            // Nivel: 3S (id: 7) -> 3ro Secundaria (grado_id: 7)
            [7, 7],
            
            // Nivel: 4S (id: 8) -> 4to Secundaria (grado_id: 8)
            [8, 8],
            
            // Nivel: 5S (id: 9) -> 5to Secundaria (grado_id: 9)
            [9, 9],
            
            // Nivel: 6S (id: 10) -> 6to Secundaria (grado_id: 10)
            [10, 10],

            // INFORMÁTICA
            // Nivel: Guscanayo (id: 17) -> 5to a 6to Primaria (grados: 3, 4)
            [3, 17],
            [4, 17],
            
            // Nivel: Guanaco (id: 18) -> 1ro a 3ro Secundaria (grados: 5, 6, 7)
            [5, 18],
            [6, 18],
            [7, 18],
            
            // Nivel: Londra (id: 19) -> 1ro a 3ro Secundaria (grados: 5, 6, 7)
            [5, 19],
            [6, 19],
            [7, 19],
            
            // Nivel: Jucumari (id: 20) -> 4to a 6to Secundaria (grados: 8, 9, 10)
            [8, 20],
            [9, 20],
            [10, 20],
            
            // Nivel: Búfeo (id: 21) -> 1ro a 3ro Secundaria (grados: 5, 6, 7)
            [5, 21],
            [6, 21],
            [7, 21],
            
            // Nivel: Puma (id: 22) -> 4to a 6to Secundaria (grados: 8, 9, 10)
            [8, 22],
            [9, 22],
            [10, 22],

            // MATEMÁTICAS
            // Nivel: Primer Nivel (id: 11) -> 1ro Secundaria (grado_id: 5)
            [5, 11],
            
            // Nivel: Segundo Nivel (id: 12) -> 2do Secundaria (grado_id: 6)
            [6, 12],
            
            // Nivel: Tercer Nivel (id: 13) -> 3ro Secundaria (grado_id: 7)
            [7, 13],
            
            // Nivel: Cuarto Nivel (id: 14) -> 4to Secundaria (grado_id: 8)
            [8, 14],
            
            // Nivel: Quinto Nivel (id: 15) -> 5to Secundaria (grado_id: 9)
            [9, 15],
            
            // Nivel: Sexto Nivel (id: 16) -> 6to Secundaria (grado_id: 10)
            [10, 16],

            // ROBÓTICA
            // Nivel: Builders P (id: 23) -> 5to a 6to Primaria (grados: 3, 4)
            [3, 23],
            [4, 23],
            
            // Nivel: Builders S (id: 24) -> 1ro a 6to Secundaria (grados: 5, 6, 7, 8, 9, 10)
            [5, 24],
            [6, 24],
            [7, 24],
            [8, 24],
            [9, 24],
            [10, 24],
            
            // Nivel: Lego P (id: 25) -> 5to a 6to Primaria (grados: 3, 4)
            [3, 25],
            [4, 25],
            
            // Nivel: Lego S (id: 26) -> 1ro a 6to Secundaria (grados: 5, 6, 7, 8, 9, 10)
            [5, 26],
            [6, 26],
            [7, 26],
            [8, 26],
            [9, 26],
            [10, 26],
        ];

        foreach ($gradoNivel as [$gradoId, $nivelId]) {
            DB::table('niveles_grados')->insert([
                'grado_id' => $gradoId,
                'nivel_id' => $nivelId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $areaNiveles = [
            // ASTRONOMÍA - ASTROFÍSICA
            [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
            [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],

            // BIOLOGIA
            [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],

            // FÍSICA
            [3, 8], [3, 9], [3, 10],

            // INFORMÁTICA
            [4, 17], [4, 18], [4, 19], [4, 20], [4, 21], [4, 22],

            // MATEMÁTICAS
            [5, 11], [5, 12], [5, 13], [5, 14], [5, 15], [5, 16],

            // QUIMICA
            [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],

            // ROBÓTICA
            [7, 23], [7, 24], [7, 25], [7, 26],
        ];

        foreach ($areaNiveles as [$areaId, $nivelId]) {
            DB::table('niveles_areas')->insert([
                'area_id' => $areaId,
                'nivel_id' => $nivelId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
