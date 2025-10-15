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
            ['id' => 1, 'nombre' => 'Colegio San Andrés', 'direccion' => 'Av. Busch, Santa Cruz', 'telefono' => '3311111', 'departamento' => 'Santa Cruz'],
            ['id' => 2, 'nombre' => 'Colegio La Salle', 'direccion' => 'Zona Sopocachi, La Paz', 'telefono' => '2211111', 'departamento' => 'La Paz'],
            ['id' => 3, 'nombre' => 'Colegio Don Bosco', 'direccion' => 'Av. América, Cochabamba', 'telefono' => '4411111', 'departamento' => 'Cochabamba'],
            ['id' => 4, 'nombre' => 'Colegio Cristo Rey', 'direccion' => 'Zona Equipetrol, Santa Cruz', 'telefono' => '3322222', 'departamento' => 'Santa Cruz'],
            ['id' => 5, 'nombre' => 'Colegio María Auxiliadora', 'direccion' => 'Zona Central, Tarija', 'telefono' => '4611111', 'departamento' => 'Tarija'],
            ['id' => 6, 'nombre' => 'Colegio Anglo Americano', 'direccion' => 'Zona San Pedro, La Paz', 'telefono' => '2222222', 'departamento' => 'La Paz'],
            ['id' => 7, 'nombre' => 'Colegio Alemán', 'direccion' => 'Av. Libertador, Sucre', 'telefono' => '4644444', 'departamento' => 'Chuquisaca'],
            ['id' => 8, 'nombre' => 'Colegio Santa Ana', 'direccion' => 'Zona Sur, Oruro', 'telefono' => '5252525', 'departamento' => 'Oruro'],
            ['id' => 9, 'nombre' => 'Colegio Bolivariano', 'direccion' => 'Zona Villa Montes', 'telefono' => '3899999', 'departamento' => 'Pando'],
            ['id' => 10, 'nombre' => 'Colegio Católico San José', 'direccion' => 'Zona Trinidad', 'telefono' => '3222222', 'departamento' => 'Beni'],
            ['id' => 11, 'nombre' => 'Colegio San Francisco', 'direccion' => 'Av. Túpac Katari', 'telefono' => '2622222', 'departamento' => 'La Paz'],
            ['id' => 12, 'nombre' => 'Colegio Nacional Junín', 'direccion' => 'Calle Bolívar', 'telefono' => '4623333', 'departamento' => 'Potosí'],
            ['id' => 13, 'nombre' => 'Colegio San Vicente', 'direccion' => 'Zona Central', 'telefono' => '3721111', 'departamento' => 'Pando'],
            ['id' => 14, 'nombre' => 'Colegio Instituto Americano', 'direccion' => 'Av. Ballivián', 'telefono' => '2229999', 'departamento' => 'La Paz'],
            ['id' => 15, 'nombre' => 'Colegio Santa Teresa', 'direccion' => 'Zona Sopocachi', 'telefono' => '2233333', 'departamento' => 'La Paz'],
            ['id' => 16, 'nombre' => 'Colegio Loyola', 'direccion' => 'Av. Ayacucho', 'telefono' => '4432222', 'departamento' => 'Cochabamba'],
            ['id' => 17, 'nombre' => 'Colegio Adventista', 'direccion' => 'Zona Norte', 'telefono' => '3324444', 'departamento' => 'Santa Cruz'],
            ['id' => 18, 'nombre' => 'Colegio San Luis', 'direccion' => 'Zona La Pampa', 'telefono' => '4645555', 'departamento' => 'Chuquisaca'],
            ['id' => 19, 'nombre' => 'Colegio Antonio José de Sucre', 'direccion' => 'Zona Ferroviaria', 'telefono' => '5277777', 'departamento' => 'Oruro'],
            ['id' => 20, 'nombre' => 'Colegio Villa Montes', 'direccion' => 'Av. Central', 'telefono' => '4638888', 'departamento' => 'Tarija'],
        ];

        foreach ($colegios as $colegio) {
            Colegio::create($colegio);
        }
    }
}
