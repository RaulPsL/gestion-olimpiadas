<?php

// database/seeders/GradosSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $grados = [
            // Primaria
            ['nombre' => '3ro Primaria'],
            ['nombre' => '4to Primaria'],
            ['nombre' => '5to Primaria'],
            ['nombre' => '6to Primaria'],
            
            // Secundaria
            ['nombre' => '1ro Secundaria'],
            ['nombre' => '2do Secundaria'],
            ['nombre' => '3ro Secundaria'],
            ['nombre' => '4to Secundaria'],
            ['nombre' => '5to Secundaria'],
            ['nombre' => '6to Secundaria'],
        ];

        DB::table('grados')->insert($grados);
    }
}