<?php
// database/seeders/NivelesSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NivelesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $niveles = [
            // Astronomía - Astrofísica
            // Física
            // Biologia
            // Quimica

            ['nombre' => '3P'],
            ['nombre' => '4P'],
            ['nombre' => '5P'],
            ['nombre' => '6P'],
            ['nombre' => '1S'],
            ['nombre' => '2S'],
            ['nombre' => '3S'],
            ['nombre' => '4S'],
            ['nombre' => '5S'],
            ['nombre' => '6S'],
            
            // Matemáticas
            ['nombre' => 'Primer Nivel'],
            ['nombre' => 'Segundo Nivel'],
            ['nombre' => 'Tercer Nivel'],
            ['nombre' => 'Cuarto Nivel'],
            ['nombre' => 'Quinto Nivel'],
            ['nombre' => 'Sexto Nivel'],
            
            // Informática
            ['nombre' => 'Guscanayo'],
            ['nombre' => 'Guanaco'],
            ['nombre' => 'Locorito'],
            ['nombre' => 'Jucumari'],
            ['nombre' => 'Búfeo'],
            ['nombre' => 'Puma'],
            
            // Robótica
            ['nombre' => 'Builders P'],
            ['nombre' => 'Builders S'],
            ['nombre' => 'Lego P'],
            ['nombre' => 'Lego S'],
        ];

        DB::table('nivels')->insert($niveles);
    }
}