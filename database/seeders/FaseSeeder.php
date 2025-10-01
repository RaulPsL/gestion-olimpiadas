<?php

namespace Database\Seeders;

use App\Models\Fase;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        
        $fases = [
            ['id' => 1, 'area_id' => 1, 'tipo_fase' => 'preliminares', 'sigla' => 'ROBPRE1', 'descripcion' => 'Preliminar de Robótica', 'cantidad_max_participantes' => 100, 'cantidad_min_participantes' => 10, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 2, 'area_id' => 1, 'tipo_fase' => 'clasificatorias', 'sigla' => 'ROBCLA1', 'descripcion' => 'Clasificatoria 1 de Robótica', 'cantidad_max_participantes' => 50, 'cantidad_min_participantes' => 5, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 3, 'area_id' => 1, 'tipo_fase' => 'clasificatorias', 'sigla' => 'ROBCLA2', 'descripcion' => 'Clasificatoria 2 de Robótica', 'cantidad_max_participantes' => 40, 'cantidad_min_participantes' => 5, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(23)],
            ['id' => 4, 'area_id' => 1, 'tipo_fase' => 'finales', 'sigla' => 'ROBFIN1', 'descripcion' => 'Final de Robótica', 'cantidad_max_participantes' => 20, 'cantidad_min_participantes' => 3, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(24), 'fecha_fin' => $now->copy()->addDays(30)],
            ['id' => 5, 'area_id' => 2, 'tipo_fase' => 'preliminares', 'sigla' => 'MATPRE1', 'descripcion' => 'Preliminar de Matemáticas', 'cantidad_max_participantes' => 200, 'cantidad_min_participantes' => 20, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 6, 'area_id' => 2, 'tipo_fase' => 'clasificatorias', 'sigla' => 'MATCLA1', 'descripcion' => 'Clasificatoria de Matemáticas', 'cantidad_max_participantes' => 100, 'cantidad_min_participantes' => 10, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 7, 'area_id' => 2, 'tipo_fase' => 'finales', 'sigla' => 'MATFIN1', 'descripcion' => 'Final de Matemáticas', 'cantidad_max_participantes' => 30, 'cantidad_min_participantes' => 5, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 8, 'area_id' => 3, 'tipo_fase' => 'preliminares', 'sigla' => 'FISPRE1', 'descripcion' => 'Preliminar de Física', 'cantidad_max_participantes' => 150, 'cantidad_min_participantes' => 15, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 9, 'area_id' => 3, 'tipo_fase' => 'clasificatorias', 'sigla' => 'FISCLA1', 'descripcion' => 'Clasificatoria de Física', 'cantidad_max_participantes' => 80, 'cantidad_min_participantes' => 8, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 10, 'area_id' => 3, 'tipo_fase' => 'finales', 'sigla' => 'FISFIN1', 'descripcion' => 'Final de Física', 'cantidad_max_participantes' => 25, 'cantidad_min_participantes' => 4, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 11, 'area_id' => 4, 'tipo_fase' => 'preliminares', 'sigla' => 'QUIPRE1', 'descripcion' => 'Preliminar de Química', 'cantidad_max_participantes' => 120, 'cantidad_min_participantes' => 12, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 12, 'area_id' => 4, 'tipo_fase' => 'clasificatorias', 'sigla' => 'QUICLA1', 'descripcion' => 'Clasificatoria de Química', 'cantidad_max_participantes' => 60, 'cantidad_min_participantes' => 6, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 13, 'area_id' => 4, 'tipo_fase' => 'finales', 'sigla' => 'QUIFIN1', 'descripcion' => 'Final de Química', 'cantidad_max_participantes' => 20, 'cantidad_min_participantes' => 3, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 14, 'area_id' => 5, 'tipo_fase' => 'preliminares', 'sigla' => 'BIOPRE1', 'descripcion' => 'Preliminar de Biología', 'cantidad_max_participantes' => 130, 'cantidad_min_participantes' => 13, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 15, 'area_id' => 5, 'tipo_fase' => 'clasificatorias', 'sigla' => 'BIOCLA1', 'descripcion' => 'Clasificatoria de Biología', 'cantidad_max_participantes' => 70, 'cantidad_min_participantes' => 7, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 16, 'area_id' => 5, 'tipo_fase' => 'finales', 'sigla' => 'BIOFIN1', 'descripcion' => 'Final de Biología', 'cantidad_max_participantes' => 20, 'cantidad_min_participantes' => 3, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 17, 'area_id' => 6, 'tipo_fase' => 'preliminares', 'sigla' => 'INFPRE1', 'descripcion' => 'Preliminar de Informática', 'cantidad_max_participantes' => 150, 'cantidad_min_participantes' => 15, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 18, 'area_id' => 6, 'tipo_fase' => 'clasificatorias', 'sigla' => 'INFCLA1', 'descripcion' => 'Clasificatoria de Informática', 'cantidad_max_participantes' => 90, 'cantidad_min_participantes' => 9, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 19, 'area_id' => 6, 'tipo_fase' => 'finales', 'sigla' => 'INFFIN1', 'descripcion' => 'Final de Informática', 'cantidad_max_participantes' => 25, 'cantidad_min_participantes' => 5, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 20, 'area_id' => 7, 'tipo_fase' => 'preliminares', 'sigla' => 'ASTPRE1', 'descripcion' => 'Preliminar de Astronomía', 'cantidad_max_participantes' => 80, 'cantidad_min_participantes' => 8, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 21, 'area_id' => 7, 'tipo_fase' => 'clasificatorias', 'sigla' => 'ASTCLA1', 'descripcion' => 'Clasificatoria de Astronomía', 'cantidad_max_participantes' => 50, 'cantidad_min_participantes' => 5, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 22, 'area_id' => 7, 'tipo_fase' => 'finales', 'sigla' => 'ASTFIN1', 'descripcion' => 'Final de Astronomía', 'cantidad_max_participantes' => 15, 'cantidad_min_participantes' => 3, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
            ['id' => 23, 'area_id' => 8, 'tipo_fase' => 'preliminares', 'sigla' => 'ELEPRE1', 'descripcion' => 'Preliminar de Electrónica', 'cantidad_max_participantes' => 100, 'cantidad_min_participantes' => 10, 'estado' => 'en curso', 'fecha_inicio' => $now, 'fecha_fin' => $now->copy()->addDays(7)],
            ['id' => 24, 'area_id' => 8, 'tipo_fase' => 'clasificatorias', 'sigla' => 'ELECLA1', 'descripcion' => 'Clasificatoria de Electrónica', 'cantidad_max_participantes' => 60, 'cantidad_min_participantes' => 6, 'estado' => 'en curso', 'fecha_inicio' => $now->copy()->addDays(8), 'fecha_fin' => $now->copy()->addDays(15)],
            ['id' => 25, 'area_id' => 8, 'tipo_fase' => 'finales', 'sigla' => 'ELEFIN1', 'descripcion' => 'Final de Electrónica', 'cantidad_max_participantes' => 18, 'cantidad_min_participantes' => 3, 'estado' => 'pendiente', 'fecha_inicio' => $now->copy()->addDays(16), 'fecha_fin' => $now->copy()->addDays(20)],
        ];

        foreach ($fases as $fase) {
            Fase::create($fase);
        }
    }
}
