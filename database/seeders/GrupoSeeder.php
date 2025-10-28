<?php

namespace Database\Seeders;

use App\Models\Grupo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grupos = [
            ['id' => 1, 'nombre' => 'Grupo Alfa', 'tutor_id' => 1, 'colegio_id' => 1],
            ['id' => 2, 'nombre' => 'Grupo Beta', 'tutor_id' => 2, 'colegio_id' => 2],
            ['id' => 3, 'nombre' => 'Grupo Gamma', 'tutor_id' => 3, 'colegio_id' => 3],
            ['id' => 4, 'nombre' => 'Grupo Delta', 'tutor_id' => 4, 'colegio_id' => 4],
            ['id' => 5, 'nombre' => 'Grupo Épsilon', 'tutor_id' => 5, 'colegio_id' => 5],
            ['id' => 6, 'nombre' => 'Grupo Zeta', 'tutor_id' => 6, 'colegio_id' => 6],
            ['id' => 7, 'nombre' => 'Grupo Eta', 'tutor_id' => 7, 'colegio_id' => 7],
            ['id' => 8, 'nombre' => 'Grupo Theta', 'tutor_id' => 8, 'colegio_id' => 8],
            ['id' => 9, 'nombre' => 'Grupo Iota', 'tutor_id' => 9, 'colegio_id' => 9],
            ['id' => 10, 'nombre' => 'Grupo Kappa', 'tutor_id' => 10, 'colegio_id' => 10],
        ];

        foreach ($grupos as $grupo) {
            Grupo::create($grupo);
        }
    }
}
