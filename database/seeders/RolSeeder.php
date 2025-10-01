<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['id' => 1, 'nombre' => 'Evaluador', 'sigla' => 'EVA', 'descripcion' => 'Encargado de evaluar a los participantes'],
            ['id' => 2, 'nombre' => 'Encargado de Área', 'sigla' => 'EDA', 'descripcion' => 'Responsable de gestionar un área'],
        ];

        foreach ($roles as $rol) {
            Rol::create($rol);
        }
    }
}
