<?php

namespace Database\Seeders;

use App\Models\Tutor;
use Illuminate\Database\Seeder;

class TutorAcademicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tutoresAcademicos = [
            ['id' => 1, 'nombre' => 'Fernando', 'apellidos' => 'Quispe', 'celular' => 71111111, 'email' => 'fernando.quispe@uni.edu.bo', 'ci' => 555001],
            ['id' => 2, 'nombre' => 'Gabriela', 'apellidos' => 'Flores', 'celular' => 72222222, 'email' => 'gabriela.flores@uni.edu.bo', 'ci' => 555002],
            ['id' => 3, 'nombre' => 'Ramiro', 'apellidos' => 'Salazar', 'celular' => 73333333, 'email' => 'ramiro.salazar@uni.edu.bo', 'ci' => 555003],
            ['id' => 4, 'nombre' => 'Claudia', 'apellidos' => 'Mamani', 'celular' => 74444444, 'email' => 'claudia.mamani@uni.edu.bo', 'ci' => 555004],
            ['id' => 5, 'nombre' => 'Hugo', 'apellidos' => 'Cárdenas', 'celular' => 75555555, 'email' => 'hugo.cardenas@uni.edu.bo', 'ci' => 555005],
            ['id' => 6, 'nombre' => 'Patricia', 'apellidos' => 'Arce', 'celular' => 76666666, 'email' => 'patricia.arce@uni.edu.bo', 'ci' => 555006],
            ['id' => 7, 'nombre' => 'Javier', 'apellidos' => 'Choque', 'celular' => 77777777, 'email' => 'javier.choque@uni.edu.bo', 'ci' => 555007],
            ['id' => 8, 'nombre' => 'Roxana', 'apellidos' => 'Ramos', 'celular' => 78888888, 'email' => 'roxana.ramos@uni.edu.bo', 'ci' => 555008],
            ['id' => 9, 'nombre' => 'Marco', 'apellidos' => 'Alvarez', 'celular' => 79999999, 'email' => 'marco.alvarez@uni.edu.bo', 'ci' => 555009],
            ['id' => 10, 'nombre' => 'Silvia', 'apellidos' => 'Torrez', 'celular' => 70121212, 'email' => 'silvia.torrez@uni.edu.bo', 'ci' => 555010],
        ];

        foreach ($tutoresAcademicos as $tutor) {
            Tutor::create($tutor);
        }
    }
}
