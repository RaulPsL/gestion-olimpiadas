<?php

namespace Database\Seeders;

use App\Models\Colegio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColegioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colegios = [
            ['id' => 1, 'nombre' => 'Colegio San Andrés', 'telefono' => '3311111', 'provincia_id' => 2],
            ['id' => 2, 'nombre' => 'Colegio La Salle', 'telefono' => '2211111', 'provincia_id' => 4],
            ['id' => 3, 'nombre' => 'Colegio Don Bosco', 'telefono' => '4411111', 'provincia_id' => 6],
            ['id' => 4, 'nombre' => 'Colegio Cristo Rey', 'telefono' => '3322222', 'provincia_id' => 7],
            ['id' => 5, 'nombre' => 'Colegio María Auxiliadora', 'telefono' => '4611111', 'provincia_id' => 9],
            ['id' => 6, 'nombre' => 'Colegio Anglo Americano', 'telefono' => '2222222', 'provincia_id' => 13],
            ['id' => 7, 'nombre' => 'Colegio Alemán', 'telefono' => '4644444', 'provincia_id' => 23],
            ['id' => 8, 'nombre' => 'Colegio Santa Ana', 'telefono' => '5252525', 'provincia_id' => 16],
            ['id' => 9, 'nombre' => 'Colegio Bolivariano', 'telefono' => '3899999', 'provincia_id' => 19],
            ['id' => 10, 'nombre' => 'Colegio Católico San José', 'telefono' => '3222222', 'provincia_id' => 34],
            ['id' => 11, 'nombre' => 'Colegio San Francisco', 'telefono' => '2622222', 'provincia_id' => 34],
            ['id' => 12, 'nombre' => 'Colegio Nacional Junín', 'telefono' => '4623333', 'provincia_id' => 23],
            ['id' => 13, 'nombre' => 'Colegio San Vicente', 'telefono' => '3721111', 'provincia_id' => 12],
            ['id' => 14, 'nombre' => 'Colegio Instituto Americano', 'telefono' => '2229999', 'provincia_id' => 34],
            ['id' => 15, 'nombre' => 'Colegio Santa Teresa', 'telefono' => '2233333', 'provincia_id' => 21],
            ['id' => 16, 'nombre' => 'Colegio Loyola', 'telefono' => '4432222', 'provincia_id' => 22],
            ['id' => 17, 'nombre' => 'Colegio Adventista', 'telefono' => '3324444', 'provincia_id' => 33],
            ['id' => 18, 'nombre' => 'Colegio San Luis', 'telefono' => '4645555', 'provincia_id' => 11],
            ['id' => 19, 'nombre' => 'Colegio Antonio José de Sucre', 'telefono' => '5277777', 'provincia_id' => 12],
            ['id' => 20, 'nombre' => 'Colegio Villa Montes', 'telefono' => '4638888', 'provincia_id' => 23],
        ];

        foreach ($colegios as $colegio) {
            Colegio::create($colegio);
        }
    }
}
