<?php

namespace Database\Seeders;

use App\Models\Tutor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tutores = [
            ['id' => 1, 'nombre' => 'José López', 'referencia' => 77389395],
            ['id' => 2, 'nombre' => 'Marta Pérez', 'referencia' => 79283872],
            ['id' => 3, 'nombre' => 'Andrés Gutiérrez', 'referencia' => 79283872],
            ['id' => 4, 'nombre' => 'Cecilia Vargas', 'referencia' => 79283873],
            ['id' => 5, 'nombre' => 'Roberto Aguilar', 'referencia' => 79283874],
            ['id' => 6, 'nombre' => 'Daniela Castro', 'referencia' => 79283876],
            ['id' => 7, 'nombre' => 'Esteban Ríos', 'referencia' => 79283877],
            ['id' => 8, 'nombre' => 'Liliana Soto', 'referencia' => 79283878],
            ['id' => 9, 'nombre' => 'Gustavo Pinto', 'referencia' => 79283879],
            ['id' => 10, 'nombre' => 'Carla Morales', 'referencia' => 79283880],
        ];

        foreach ($tutores as $tutor) {
            Tutor::create($tutor);
        }
    }
}
