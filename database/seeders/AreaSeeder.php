<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = [
            ['id' => 1, 'nombre' => 'Robótica', 'sigla' => 'ROB', 'descripcion' => 'Área de robótica aplicada', 'nivel' => 'primaria'],
            ['id' => 2, 'nombre' => 'Matemáticas', 'sigla' => 'MAT', 'descripcion' => 'Resolución de problemas matemáticos', 'nivel' => 'primaria'],
            ['id' => 3, 'nombre' => 'Física', 'sigla' => 'FIS', 'descripcion' => 'Experimentos y teoría física', 'nivel' => 'secundaria'],
            ['id' => 4, 'nombre' => 'Química', 'sigla' => 'QUI', 'descripcion' => 'Laboratorio y teoría química', 'nivel' => 'secundaria'],
            ['id' => 5, 'nombre' => 'Biología', 'sigla' => 'BIO', 'descripcion' => 'Estudios de la vida y organismos', 'nivel' => 'secundaria'],
            ['id' => 6, 'nombre' => 'Informática', 'sigla' => 'INF', 'descripcion' => 'Programación y algoritmos', 'nivel' => 'primaria'],
            ['id' => 7, 'nombre' => 'Astronomía', 'sigla' => 'AST', 'descripcion' => 'Estudio de cuerpos celestes', 'nivel' => 'secundaria'],
            ['id' => 8, 'nombre' => 'Electrónica', 'sigla' => 'ELE', 'descripcion' => 'Circuitos y sistemas electrónicos', 'nivel' => 'primaria'],
        ];

        foreach ($areas as $area) {
            Area::create($area);
        }
    }
}
