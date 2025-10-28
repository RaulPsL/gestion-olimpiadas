<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
            [
                'nombre' => 'ASTRONOMÍA - ASTROFÍSICA',
                'sigla' => 'AST',
                'descripcion' => 'Área de astronomía y astrofísica enfocada en el estudio del universo, los cuerpos celestes y fenómenos astronómicos.',
            ],
            [
                'nombre' => 'BIOLOGÍA',
                'sigla' => 'BIO',
                'descripcion' => 'Área de biología dedicada al estudio de los seres vivos, su estructura, función, evolución y relaciones.',
            ],
            [
                'nombre' => 'FÍSICA',
                'sigla' => 'FIS',
                'descripcion' => 'Área de física enfocada en el estudio de la materia, energía y sus interacciones en el universo.',
            ],
            [
                'nombre' => 'INFORMÁTICA',
                'sigla' => 'INF',
                'descripcion' => 'Área de informática centrada en programación, algoritmos y resolución de problemas computacionales.',
            ],
            [
                'nombre' => 'MATEMÁTICAS',
                'sigla' => 'MAT',
                'descripcion' => 'Área de matemáticas dedicada al estudio de números, estructuras, patrones y resolución de problemas lógicos.',
            ],
            [
                'nombre' => 'QUÍMICA',
                'sigla' => 'QUI',
                'descripcion' => 'Área de química enfocada en el estudio de la composición, estructura y propiedades de la materia.',
            ],
            [
                'nombre' => 'ROBÓTICA',
                'sigla' => 'ROB',
                'descripcion' => 'Área de robótica dedicada al diseño, construcción y programación de robots y sistemas automatizados.',
            ],
            ['nombre' => 'Electrónica', 'sigla' => 'ELE', 'descripcion' => 'Circuitos y sistemas electrónicos'],
        ];

        DB::table('areas')->insert($areas);
    }
}