<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FaseSeeder extends Seeder
{
    public function run()
    {
        $areas = [
            ['id' => 1, 'sigla' => 'ROB'],
            ['id' => 2, 'sigla' => 'MAT'],
            ['id' => 3, 'sigla' => 'FIS'],
            ['id' => 4, 'sigla' => 'QUI'],
            ['id' => 5, 'sigla' => 'BIO'],
            ['id' => 6, 'sigla' => 'INF'],
            ['id' => 7, 'sigla' => 'AST'],
            ['id' => 8, 'sigla' => 'ELE'],
        ];

        $tipos = ['preliminales', 'clasificatorias', 'finales'];
        $estados = ['pendiente', 'en curso', 'finalizada'];

        $fases = [];
        $id = 1;

        // Semilla base de fechas
        $base = Carbon::create(2025, 5, 1);

        // Total de 32 fases distribuidas entre las 8 áreas
        foreach ($areas as $area) {
            $numClasificatorias = rand(2, 5); // número variable de clasificatorias
            $totalFasesArea = 2 + $numClasificatorias; // 1 preliminal + n clasificatorias + 1 final

            // === FASE PRELIMINAL ===
            $inicio = $base->copy()->addDays(rand(0, 10));
            $fin = $inicio->copy()->addDays(rand(5, 10));
            $calificacion = $fin->copy()->subDays(rand(1, 3));
            $fases[] = [
                'id' => $id++,
                'tipo_fase' => 'preliminales',
                'sigla' => $area['sigla'] . 'PRE',
                'descripcion' => 'Fase preliminal del área ' . $area['sigla'],
                'cantidad_max_participantes' => rand(20, 40),
                'cantidad_min_participantes' => rand(10, 15),
                'estado' => 'en curso',
                'fecha_inicio' => $inicio,
                'fecha_fin' => $fin,
                'area_id' => $area['id'],
                'cantidad_ganadores' => rand(5, 8),
                'fecha_calificacion' => $calificacion,
            ];

            // === FASES CLASIFICATORIAS ===
            for ($i = 1; $i <= $numClasificatorias; $i++) {
                $inicio = $fin->copy()->addDays(rand(5, 10));
                $fin = $inicio->copy()->addDays(rand(5, 10));
                $calificacion = $fin->copy()->subDays(rand(1, 3));

                $ganadoresPrev = end($fases)['cantidad_ganadores'];
                $fases[] = [
                    'id' => $id++,
                    'tipo_fase' => 'clasificatorias',
                    'sigla' => strtoupper($area['sigla'] . 'CLA' . $i),
                    'descripcion' => 'Fase clasificatoria ' . $i . ' del área ' . $area['sigla'],
                    'cantidad_max_participantes' => $ganadoresPrev,
                    'cantidad_min_participantes' => max(3, intval($ganadoresPrev / 2)),
                    'estado' => 'pendiente',
                    'fecha_inicio' => $inicio,
                    'fecha_fin' => $fin,
                    'area_id' => $area['id'],
                    'cantidad_ganadores' => max(3, intval($ganadoresPrev / 2)),
                    'fecha_calificacion' => $calificacion,
                ];
            }

            // === FASE FINAL ===
            $inicio = $fin->copy()->addDays(rand(7, 10));
            $fin = $inicio->copy()->addDays(rand(5, 8));
            $calificacion = $fin->copy()->subDays(rand(1, 2));

            $ganadoresPrev = end($fases)['cantidad_ganadores'];
            $fases[] = [
                'id' => $id++,
                'tipo_fase' => 'finales',
                'sigla' => strtoupper($area['sigla'] . 'FIN'),
                'descripcion' => 'Fase final del área ' . $area['sigla'],
                'cantidad_max_participantes' => $ganadoresPrev,
                'cantidad_min_participantes' => max(3, intval($ganadoresPrev / 2)),
                'estado' => 'pendiente',
                'fecha_inicio' => $inicio,
                'fecha_fin' => $fin,
                'area_id' => $area['id'],
                'cantidad_ganadores' => max(3, intval($ganadoresPrev / 2)),
                'fecha_calificacion' => $calificacion,
            ];
        }

        // Tomamos solo las primeras 32 fases generadas
        $fases = array_slice($fases, 0, 32);

        DB::table('fases')->insert($fases);
    }
}
