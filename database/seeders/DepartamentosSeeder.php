<?php

// database/seeders/DepartamentosSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartamentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departamentos = [
            ['nombre' => 'Chuquisaca', 'sigla' => 'CH'],
            ['nombre' => 'La Paz', 'sigla' => 'LP'],
            ['nombre' => 'Cochabamba', 'sigla' => 'CB'],
            ['nombre' => 'Oruro', 'sigla' => 'OR'],
            ['nombre' => 'Potosí', 'sigla' => 'PT'],
            ['nombre' => 'Tarija', 'sigla' => 'TJ'],
            ['nombre' => 'Santa Cruz', 'sigla' => 'SC'],
            ['nombre' => 'Beni', 'sigla' => 'BN'],
            ['nombre' => 'Pando', 'sigla' => 'PD'],
        ];

        DB::table('departamentos')->insert($departamentos);
    }
}
