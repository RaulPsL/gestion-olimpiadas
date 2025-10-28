<?php

namespace Database\Seeders;

use App\Models\Fase;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class FaseSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        $fases = [
            // Robótica (area_id: 7) - Tiene niveles: Builders P (23), Builders S (24), Lego P (25), Lego S (26)
            [
                'area_id' => 7,
                'nivel_id' => 23, // Builders P
                'tipo_fase' => 'preliminares',
                'sigla' => 'ROBPRE1',
                'descripcion' => 'Preliminar de Robótica',
                'cantidad_max_participantes' => 100,
                'cantidad_min_participantes' => 10,
                'cantidad_ganadores' => 50,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(15),
                'fecha_calificacion' => $now->copy()->subDays(12),
                'fecha_fin' => $now->copy()->subDays(11)
            ],
            [
                'area_id' => 7,
                'nivel_id' => 24, // Builders S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ROBCLA1',
                'descripcion' => 'Clasificatoria 1 de Robótica',
                'cantidad_max_participantes' => 50,
                'cantidad_min_participantes' => 8,
                'cantidad_ganadores' => 25,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(10),
                'fecha_calificacion' => $now->copy()->subDays(7),
                'fecha_fin' => $now->copy()->subDays(6)
            ],
            [
                'area_id' => 7,
                'nivel_id' => 25, // Lego P
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ROBCLA2',
                'descripcion' => 'Clasificatoria 2 de Robótica',
                'cantidad_max_participantes' => 25,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 15,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDays(2),
                'fecha_calificacion' => $now->copy()->addDay(1),
                'fecha_fin' => $now->copy()->addDays(2)
            ],
            [
                'area_id' => 7,
                'nivel_id' => 26, // Lego S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ROBCLA3',
                'descripcion' => 'Clasificatoria 3 de Robótica',
                'cantidad_max_participantes' => 15,
                'cantidad_min_participantes' => 3,
                'cantidad_ganadores' => 8,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(3),
                'fecha_calificacion' => $now->copy()->addDays(5),
                'fecha_fin' => $now->copy()->addDays(7)
            ],
            [
                'area_id' => 7,
                'nivel_id' => 24, // Builders S
                'tipo_fase' => 'finales',
                'sigla' => 'ROBFIN1',
                'descripcion' => 'Final de Robótica',
                'cantidad_max_participantes' => 8,
                'cantidad_min_participantes' => 3,
                'cantidad_ganadores' => 3,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(8),
                'fecha_calificacion' => $now->copy()->addDays(11),
                'fecha_fin' => $now->copy()->addDays(12)
            ],

            // Matemáticas (area_id: 5) - Niveles: Primer Nivel (11) a Sexto Nivel (16)
            [
                'area_id' => 5,
                'nivel_id' => 11, // Primer Nivel
                'tipo_fase' => 'preliminares',
                'sigla' => 'MATPRE1',
                'descripcion' => 'Preliminar de Matemáticas',
                'cantidad_max_participantes' => 200,
                'cantidad_min_participantes' => 20,
                'cantidad_ganadores' => 100,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(20),
                'fecha_calificacion' => $now->copy()->subDays(17),
                'fecha_fin' => $now->copy()->subDays(16)
            ],
            [
                'area_id' => 5,
                'nivel_id' => 12, // Segundo Nivel
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'MATCLA1',
                'descripcion' => 'Clasificatoria 1 de Matemáticas',
                'cantidad_max_participantes' => 100,
                'cantidad_min_participantes' => 15,
                'cantidad_ganadores' => 50,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(15),
                'fecha_calificacion' => $now->copy()->subDays(12),
                'fecha_fin' => $now->copy()->subDays(11)
            ],
            [
                'area_id' => 5,
                'nivel_id' => 13, // Tercer Nivel
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'MATCLA2',
                'descripcion' => 'Clasificatoria 2 de Matemáticas',
                'cantidad_max_participantes' => 50,
                'cantidad_min_participantes' => 8,
                'cantidad_ganadores' => 20,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(10),
                'fecha_calificacion' => $now->copy()->subDays(7),
                'fecha_fin' => $now->copy()->subDays(6)
            ],
            [
                'area_id' => 5,
                'nivel_id' => 14, // Cuarto Nivel
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'MATCLA3',
                'descripcion' => 'Clasificatoria 3 de Matemáticas',
                'cantidad_max_participantes' => 20,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 10,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDay(1),
                'fecha_calificacion' => $now->copy()->addDay(2),
                'fecha_fin' => $now->copy()->addDays(3)
            ],
            [
                'area_id' => 5,
                'nivel_id' => 15, // Quinto Nivel
                'tipo_fase' => 'finales',
                'sigla' => 'MATFIN1',
                'descripcion' => 'Final de Matemáticas',
                'cantidad_max_participantes' => 10,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 5,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(4),
                'fecha_calificacion' => $now->copy()->addDays(7),
                'fecha_fin' => $now->copy()->addDays(8)
            ],

            // Física (area_id: 3) - Niveles de secundaria (5-10: 1S a 6S)
            [
                'area_id' => 3,
                'nivel_id' => 8, // 4S
                'tipo_fase' => 'preliminares',
                'sigla' => 'FISPRE1',
                'descripcion' => 'Preliminar de Física',
                'cantidad_max_participantes' => 150,
                'cantidad_min_participantes' => 15,
                'cantidad_ganadores' => 80,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(18),
                'fecha_calificacion' => $now->copy()->subDays(15),
                'fecha_fin' => $now->copy()->subDays(14)
            ],
            [
                'area_id' => 3,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'FISCLA1',
                'descripcion' => 'Clasificatoria 1 de Física',
                'cantidad_max_participantes' => 80,
                'cantidad_min_participantes' => 10,
                'cantidad_ganadores' => 40,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDays(3),
                'fecha_calificacion' => $now->copy(),
                'fecha_fin' => $now->copy()->addDay(1)
            ],
            [
                'area_id' => 3,
                'nivel_id' => 10, // 6S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'FISCLA2',
                'descripcion' => 'Clasificatoria 2 de Física',
                'cantidad_max_participantes' => 40,
                'cantidad_min_participantes' => 6,
                'cantidad_ganadores' => 20,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(2),
                'fecha_calificacion' => $now->copy()->addDays(4),
                'fecha_fin' => $now->copy()->addDays(6)
            ],
            [
                'area_id' => 3,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'FISCLA3',
                'descripcion' => 'Clasificatoria 3 de Física',
                'cantidad_max_participantes' => 20,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 8,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(7),
                'fecha_calificacion' => $now->copy()->addDays(10),
                'fecha_fin' => $now->copy()->addDays(11)
            ],
            [
                'area_id' => 3,
                'nivel_id' => 10, // 6S
                'tipo_fase' => 'finales',
                'sigla' => 'FISFIN1',
                'descripcion' => 'Final de Física',
                'cantidad_max_participantes' => 8,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 4,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(12),
                'fecha_calificacion' => $now->copy()->addDays(14),
                'fecha_fin' => $now->copy()->addDays(16)
            ],

            // Química (area_id: 6) - Niveles de secundaria
            [
                'area_id' => 6,
                'nivel_id' => 6, // 2S
                'tipo_fase' => 'preliminares',
                'sigla' => 'QUIPRE1',
                'descripcion' => 'Preliminar de Química',
                'cantidad_max_participantes' => 120,
                'cantidad_min_participantes' => 12,
                'cantidad_ganadores' => 60,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDays(2),
                'fecha_calificacion' => $now->copy()->addDay(1),
                'fecha_fin' => $now->copy()->addDays(2)
            ],
            [
                'area_id' => 6,
                'nivel_id' => 8, // 4S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'QUICLA1',
                'descripcion' => 'Clasificatoria 1 de Química',
                'cantidad_max_participantes' => 60,
                'cantidad_min_participantes' => 8,
                'cantidad_ganadores' => 30,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(3),
                'fecha_calificacion' => $now->copy()->addDays(6),
                'fecha_fin' => $now->copy()->addDays(7)
            ],
            [
                'area_id' => 6,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'QUICLA2',
                'descripcion' => 'Clasificatoria 2 de Química',
                'cantidad_max_participantes' => 30,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 12,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(8),
                'fecha_calificacion' => $now->copy()->addDays(10),
                'fecha_fin' => $now->copy()->addDays(12)
            ],
            [
                'area_id' => 6,
                'nivel_id' => 10, // 6S
                'tipo_fase' => 'finales',
                'sigla' => 'QUIFIN1',
                'descripcion' => 'Final de Química',
                'cantidad_max_participantes' => 12,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 5,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(13),
                'fecha_calificacion' => $now->copy()->addDays(15),
                'fecha_fin' => $now->copy()->addDays(17)
            ],

            // Biología (area_id: 2) - Niveles de secundaria
            [
                'area_id' => 2,
                'nivel_id' => 6, // 2S
                'tipo_fase' => 'preliminares',
                'sigla' => 'BIOPRE1',
                'descripcion' => 'Preliminar de Biología',
                'cantidad_max_participantes' => 130,
                'cantidad_min_participantes' => 13,
                'cantidad_ganadores' => 70,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(22),
                'fecha_calificacion' => $now->copy()->subDays(19),
                'fecha_fin' => $now->copy()->subDays(18)
            ],
            [
                'area_id' => 2,
                'nivel_id' => 7, // 3S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'BIOCLA1',
                'descripcion' => 'Clasificatoria 1 de Biología',
                'cantidad_max_participantes' => 70,
                'cantidad_min_participantes' => 10,
                'cantidad_ganadores' => 35,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(17),
                'fecha_calificacion' => $now->copy()->subDays(14),
                'fecha_fin' => $now->copy()->subDays(13)
            ],
            [
                'area_id' => 2,
                'nivel_id' => 8, // 4S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'BIOCLA2',
                'descripcion' => 'Clasificatoria 2 de Biología',
                'cantidad_max_participantes' => 35,
                'cantidad_min_participantes' => 6,
                'cantidad_ganadores' => 18,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(12),
                'fecha_calificacion' => $now->copy()->subDays(9),
                'fecha_fin' => $now->copy()->subDays(8)
            ],
            [
                'area_id' => 2,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'BIOCLA3',
                'descripcion' => 'Clasificatoria 3 de Biología',
                'cantidad_max_participantes' => 18,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 8,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(7),
                'fecha_calificacion' => $now->copy()->subDays(4),
                'fecha_fin' => $now->copy()->subDays(3)
            ],
            [
                'area_id' => 2,
                'nivel_id' => 10, // 6S
                'tipo_fase' => 'finales',
                'sigla' => 'BIOFIN1',
                'descripcion' => 'Final de Biología',
                'cantidad_max_participantes' => 8,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 4,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDay(1),
                'fecha_calificacion' => $now->copy()->addDay(2),
                'fecha_fin' => $now->copy()->addDays(3)
            ],

            // Informática (area_id: 4) - Niveles: Guscanayo (17) a Puma (22)
            [
                'area_id' => 4,
                'nivel_id' => 17, // Guscanayo
                'tipo_fase' => 'preliminares',
                'sigla' => 'INFPRE1',
                'descripcion' => 'Preliminar de Informática',
                'cantidad_max_participantes' => 150,
                'cantidad_min_participantes' => 15,
                'cantidad_ganadores' => 90,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(1),
                'fecha_calificacion' => $now->copy()->addDays(3),
                'fecha_fin' => $now->copy()->addDays(5)
            ],
            [
                'area_id' => 4,
                'nivel_id' => 18, // Guanaco
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'INFCLA1',
                'descripcion' => 'Clasificatoria 1 de Informática',
                'cantidad_max_participantes' => 90,
                'cantidad_min_participantes' => 12,
                'cantidad_ganadores' => 45,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(6),
                'fecha_calificacion' => $now->copy()->addDays(8),
                'fecha_fin' => $now->copy()->addDays(10)
            ],
            [
                'area_id' => 4,
                'nivel_id' => 20, // Jucumari
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'INFCLA2',
                'descripcion' => 'Clasificatoria 2 de Informática',
                'cantidad_max_participantes' => 45,
                'cantidad_min_participantes' => 7,
                'cantidad_ganadores' => 20,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(11),
                'fecha_calificacion' => $now->copy()->addDays(14),
                'fecha_fin' => $now->copy()->addDays(15)
            ],
            [
                'area_id' => 4,
                'nivel_id' => 22, // Puma
                'tipo_fase' => 'finales',
                'sigla' => 'INFFIN1',
                'descripcion' => 'Final de Informática',
                'cantidad_max_participantes' => 20,
                'cantidad_min_participantes' => 7,
                'cantidad_ganadores' => 7,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(16),
                'fecha_calificacion' => $now->copy()->addDays(19),
                'fecha_fin' => $now->copy()->addDays(20)
            ],

            // Astronomía (area_id: 1) - Niveles: 3P (1) a 6S (10)
            [
                'area_id' => 1,
                'nivel_id' => 1, // 3P
                'tipo_fase' => 'preliminares',
                'sigla' => 'ASTPRE1',
                'descripcion' => 'Preliminar de Astronomía',
                'cantidad_max_participantes' => 80,
                'cantidad_min_participantes' => 8,
                'cantidad_ganadores' => 50,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(12),
                'fecha_calificacion' => $now->copy()->subDays(9),
                'fecha_fin' => $now->copy()->subDays(8)
            ],
            [
                'area_id' => 1,
                'nivel_id' => 5, // 1S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ASTCLA1',
                'descripcion' => 'Clasificatoria 1 de Astronomía',
                'cantidad_max_participantes' => 50,
                'cantidad_min_participantes' => 6,
                'cantidad_ganadores' => 25,
                'estado' => 'finalizada',
                'fecha_inicio' => $now->copy()->subDays(7),
                'fecha_calificacion' => $now->copy()->subDays(4),
                'fecha_fin' => $now->copy()->subDays(3)
            ],
            [
                'area_id' => 1,
                'nivel_id' => 7, // 3S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ASTCLA2',
                'descripcion' => 'Clasificatoria 2 de Astronomía',
                'cantidad_max_participantes' => 25,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 10,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDay(1),
                'fecha_calificacion' => $now->copy()->addDay(1),
                'fecha_fin' => $now->copy()->addDays(3)
            ],
            [
                'area_id' => 1,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'finales',
                'sigla' => 'ASTFIN1',
                'descripcion' => 'Final de Astronomía',
                'cantidad_max_participantes' => 10,
                'cantidad_min_participantes' => 4,
                'cantidad_ganadores' => 4,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(4),
                'fecha_calificacion' => $now->copy()->addDays(6),
                'fecha_fin' => $now->copy()->addDays(8)
            ],

            // Electrónica (area_id: 8) - Niveles de secundaria
            [
                'area_id' => 8,
                'nivel_id' => 7, // 3S
                'tipo_fase' => 'preliminares',
                'sigla' => 'ELEPRE1',
                'descripcion' => 'Preliminar de Electrónica',
                'cantidad_max_participantes' => 100,
                'cantidad_min_participantes' => 10,
                'cantidad_ganadores' => 60,
                'estado' => 'en curso',
                'fecha_inicio' => $now->copy()->subDays(1),
                'fecha_calificacion' => $now->copy()->addDay(2),
                'fecha_fin' => $now->copy()->addDays(3)
            ],
            [
                'area_id' => 8,
                'nivel_id' => 8, // 4S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ELECLA1',
                'descripcion' => 'Clasificatoria 1 de Electrónica',
                'cantidad_max_participantes' => 60,
                'cantidad_min_participantes' => 8,
                'cantidad_ganadores' => 30,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(4),
                'fecha_calificacion' => $now->copy()->addDays(6),
                'fecha_fin' => $now->copy()->addDays(8)
            ],
            [
                'area_id' => 8,
                'nivel_id' => 9, // 5S
                'tipo_fase' => 'clasificatorias',
                'sigla' => 'ELECLA2',
                'descripcion' => 'Clasificatoria 2 de Electrónica',
                'cantidad_max_participantes' => 30,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 12,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(9),
                'fecha_calificacion' => $now->copy()->addDays(11),
                'fecha_fin' => $now->copy()->addDays(13)
            ],
            [
                'area_id' => 8,
                'nivel_id' => 10, // 6S
                'tipo_fase' => 'finales',
                'sigla' => 'ELEFIN1',
                'descripcion' => 'Final de Electrónica',
                'cantidad_max_participantes' => 12,
                'cantidad_min_participantes' => 5,
                'cantidad_ganadores' => 5,
                'estado' => 'pendiente',
                'fecha_inicio' => $now->copy()->addDays(14),
                'fecha_calificacion' => $now->copy()->addDays(16),
                'fecha_fin' => $now->copy()->addDays(18)
            ],
        ];

        foreach ($fases as $fase) {
            Fase::create($fase);
        }
    }
}
