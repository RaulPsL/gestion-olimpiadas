<?php

namespace Database\Seeders;

use App\Models\Olimpista;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OlimpistaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $olimpistas = [
            // Primaria
            ['id' => 1, 'nombres' => 'Juan', 'apellido_paterno' => 'López', 'apellido_materno' => 'García', 'ci' => 700001, 'celular' => 71111111, 'grado_escolar' => 'primero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 1, 'tutor_id' => 1],
            ['id' => 2, 'nombres' => 'María', 'apellido_paterno' => 'Pérez', 'apellido_materno' => 'Quispe', 'ci' => 700002, 'celular' => 72222222, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 2, 'tutor_id' => 2],
            ['id' => 3, 'nombres' => 'Luis', 'apellido_paterno' => 'Gonzales', 'apellido_materno' => 'Torrez', 'ci' => 700003, 'celular' => 73333333, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 3, 'tutor_id' => 3],
            ['id' => 4, 'nombres' => 'Ana', 'apellido_paterno' => 'Vargas', 'apellido_materno' => 'Rojas', 'ci' => 700004, 'celular' => 74444444, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 4, 'tutor_id' => 4],
            ['id' => 5, 'nombres' => 'Pedro', 'apellido_paterno' => 'Suárez', 'apellido_materno' => 'Flores', 'ci' => 700005, 'celular' => 75555555, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 5, 'tutor_id' => 5],
            ['id' => 6, 'nombres' => 'Lucía', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'Mamani', 'ci' => 700006, 'celular' => 76666666, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 6, 'tutor_id' => 6],
            ['id' => 7, 'nombres' => 'Diego', 'apellido_paterno' => 'Fernández', 'apellido_materno' => 'Choque', 'ci' => 700007, 'celular' => 77777777, 'grado_escolar' => 'primero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 7, 'tutor_id' => 7],
            ['id' => 8, 'nombres' => 'Valeria', 'apellido_paterno' => 'Castro', 'apellido_materno' => 'Ramos', 'ci' => 700008, 'celular' => 78888888, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 8, 'tutor_id' => 8],
            ['id' => 9, 'nombres' => 'Jorge', 'apellido_paterno' => 'Mendoza', 'apellido_materno' => 'Alvarez', 'ci' => 700009, 'celular' => 79999999, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 9, 'tutor_id' => 9],
            ['id' => 10, 'nombres' => 'Camila', 'apellido_paterno' => 'Rojas', 'apellido_materno' => 'Cárdenas', 'ci' => 700010, 'celular' => 70101010, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 10, 'tutor_id' => 10],
            ['id' => 11, 'nombres' => 'Andrés', 'apellido_paterno' => 'Quispe', 'apellido_materno' => 'Salazar', 'ci' => 700011, 'celular' => 70111112, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 11, 'tutor_id' => 1],
            ['id' => 12, 'nombres' => 'Paola', 'apellido_paterno' => 'Gutiérrez', 'apellido_materno' => 'Torrez', 'ci' => 700012, 'celular' => 72222223, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 12, 'tutor_id' => 2],
            ['id' => 13, 'nombres' => 'Sofía', 'apellido_paterno' => 'Flores', 'apellido_materno' => 'Mamani', 'ci' => 700013, 'celular' => 73333334, 'grado_escolar' => 'primero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 13, 'tutor_id' => 3],
            ['id' => 14, 'nombres' => 'Hernán', 'apellido_paterno' => 'Rojas', 'apellido_materno' => 'Choque', 'ci' => 700014, 'celular' => 74444445, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 14, 'tutor_id' => 4],
            ['id' => 15, 'nombres' => 'Gabriela', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'Quispe', 'ci' => 700015, 'celular' => 75555556, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 15, 'tutor_id' => 5],
            ['id' => 16, 'nombres' => 'Rodrigo', 'apellido_paterno' => 'Suárez', 'apellido_materno' => 'García', 'ci' => 700016, 'celular' => 76666667, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 16, 'tutor_id' => 6],
            ['id' => 17, 'nombres' => 'Claudia', 'apellido_paterno' => 'Vargas', 'apellido_materno' => 'Pinto', 'ci' => 700017, 'celular' => 77777778, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 17, 'tutor_id' => 7],
            ['id' => 18, 'nombres' => 'Martín', 'apellido_paterno' => 'Mamani', 'apellido_materno' => 'Alvarez', 'ci' => 700018, 'celular' => 78888889, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 18, 'tutor_id' => 8],
            ['id' => 19, 'nombres' => 'Patricia', 'apellido_paterno' => 'Cárdenas', 'apellido_materno' => 'Salazar', 'ci' => 700019, 'celular' => 79999990, 'grado_escolar' => 'primero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 19, 'tutor_id' => 9],
            ['id' => 20, 'nombres' => 'Javier', 'apellido_paterno' => 'Choque', 'apellido_materno' => 'Torrez', 'ci' => 700020, 'celular' => 70101011, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 20, 'tutor_id' => 10],
            ['id' => 21, 'nombres' => 'Elena', 'apellido_paterno' => 'Alvarez', 'apellido_materno' => 'Ramos', 'ci' => 700021, 'celular' => 70111113, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 1, 'tutor_id' => 1],
            ['id' => 22, 'nombres' => 'Marco', 'apellido_paterno' => 'García', 'apellido_materno' => 'Flores', 'ci' => 700022, 'celular' => 72222224, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 2, 'tutor_id' => 2],
            ['id' => 23, 'nombres' => 'Natalia', 'apellido_paterno' => 'Torrez', 'apellido_materno' => 'Mamani', 'ci' => 700023, 'celular' => 73333335, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 3, 'tutor_id' => 3],
            ['id' => 24, 'nombres' => 'Esteban', 'apellido_paterno' => 'Pinto', 'apellido_materno' => 'Rojas', 'ci' => 700024, 'celular' => 74444446, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 4, 'tutor_id' => 4],
            ['id' => 25, 'nombres' => 'Silvia', 'apellido_paterno' => 'Ramos', 'apellido_materno' => 'García', 'ci' => 700025, 'celular' => 75555557, 'grado_escolar' => 'primero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 5, 'tutor_id' => 5],
            ['id' => 26, 'nombres' => 'Fernando', 'apellido_paterno' => 'Flores', 'apellido_materno' => 'Salazar', 'ci' => 700026, 'celular' => 76666668, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 6, 'tutor_id' => 6],
            ['id' => 27, 'nombres' => 'Roxana', 'apellido_paterno' => 'García', 'apellido_materno' => 'Torrez', 'ci' => 700027, 'celular' => 77777779, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 7, 'tutor_id' => 7],
            ['id' => 28, 'nombres' => 'Gustavo', 'apellido_paterno' => 'Quispe', 'apellido_materno' => 'Choque', 'ci' => 700028, 'celular' => 78888880, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 8, 'tutor_id' => 8],
            ['id' => 29, 'nombres' => 'Liliana', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'Vargas', 'ci' => 700029, 'celular' => 79999991, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 9, 'tutor_id' => 9],
            ['id' => 30, 'nombres' => 'Hugo', 'apellido_paterno' => 'Suárez', 'apellido_materno' => 'Pinto', 'ci' => 700030, 'celular' => 70101012, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'primaria', 'estado' => 'activo', 'colegio_id' => 10, 'tutor_id' => 10],

            // Secundaria
            ['id' => 31, 'nombres' => 'Carla', 'apellido_paterno' => 'Rojas', 'apellido_materno' => 'Alvarez', 'ci' => 700031, 'celular' => 70111114, 'grado_escolar' => 'primero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 11, 'tutor_id' => 1],
            ['id' => 32, 'nombres' => 'Daniel', 'apellido_paterno' => 'Vargas', 'apellido_materno' => 'Choque', 'ci' => 700032, 'celular' => 72222225, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 12, 'tutor_id' => 2],
            ['id' => 33, 'nombres' => 'Verónica', 'apellido_paterno' => 'Mamani', 'apellido_materno' => 'Flores', 'ci' => 700033, 'celular' => 73333336, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 13, 'tutor_id' => 3],
            ['id' => 34, 'nombres' => 'Miguel', 'apellido_paterno' => 'Torrez', 'apellido_materno' => 'Pinto', 'ci' => 700034, 'celular' => 74444447, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 14, 'tutor_id' => 4],
            ['id' => 35, 'nombres' => 'Clara', 'apellido_paterno' => 'Alvarez', 'apellido_materno' => 'García', 'ci' => 700035, 'celular' => 75555558, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 15, 'tutor_id' => 5],
            ['id' => 36, 'nombres' => 'Oscar', 'apellido_paterno' => 'Quispe', 'apellido_materno' => 'Salazar', 'ci' => 700036, 'celular' => 76666669, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 16, 'tutor_id' => 6],
            ['id' => 37, 'nombres' => 'Sandra', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'Vargas', 'ci' => 700037, 'celular' => 77777780, 'grado_escolar' => 'primero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 17, 'tutor_id' => 7],
            ['id' => 38, 'nombres' => 'Hernán', 'apellido_paterno' => 'Pérez', 'apellido_materno' => 'Rojas', 'ci' => 700038, 'celular' => 78888881, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 18, 'tutor_id' => 8],
            ['id' => 39, 'nombres' => 'Andrea', 'apellido_paterno' => 'Gonzales', 'apellido_materno' => 'Mamani', 'ci' => 700039, 'celular' => 79999992, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 19, 'tutor_id' => 9],
            ['id' => 40, 'nombres' => 'Raúl', 'apellido_paterno' => 'Suárez', 'apellido_materno' => 'Choque', 'ci' => 700040, 'celular' => 70101013, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 20, 'tutor_id' => 10],
            ['id' => 41, 'nombres' => 'Laura', 'apellido_paterno' => 'Vargas', 'apellido_materno' => 'Flores', 'ci' => 700041, 'celular' => 70111115, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 1, 'tutor_id' => 1],
            ['id' => 42, 'nombres' => 'Jhonny', 'apellido_paterno' => 'Rojas', 'apellido_materno' => 'Salazar', 'ci' => 700042, 'celular' => 72222226, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 2, 'tutor_id' => 2],
            ['id' => 43, 'nombres' => 'Paola', 'apellido_paterno' => 'Mamani', 'apellido_materno' => 'Choque', 'ci' => 700043, 'celular' => 73333337, 'grado_escolar' => 'primero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 3, 'tutor_id' => 3],
            ['id' => 44, 'nombres' => 'Rodrigo', 'apellido_paterno' => 'Quispe', 'apellido_materno' => 'Torrez', 'ci' => 700044, 'celular' => 74444448, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 4, 'tutor_id' => 4],
            ['id' => 45, 'nombres' => 'Valentina', 'apellido_paterno' => 'García', 'apellido_materno' => 'Alvarez', 'ci' => 700045, 'celular' => 75555559, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 5, 'tutor_id' => 5],
            ['id' => 46, 'nombres' => 'Cristian', 'apellido_paterno' => 'Cárdenas', 'apellido_materno' => 'Flores', 'ci' => 700046, 'celular' => 76666670, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 6, 'tutor_id' => 6],
            ['id' => 47, 'nombres' => 'Mónica', 'apellido_paterno' => 'Ramos', 'apellido_materno' => 'Choque', 'ci' => 700047, 'celular' => 77777781, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 7, 'tutor_id' => 7],
            ['id' => 48, 'nombres' => 'Kevin', 'apellido_paterno' => 'Torrez', 'apellido_materno' => 'Mamani', 'ci' => 700048, 'celular' => 78888882, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 8, 'tutor_id' => 8],
            ['id' => 49, 'nombres' => 'Julia', 'apellido_paterno' => 'Flores', 'apellido_materno' => 'Pinto', 'ci' => 700049, 'celular' => 79999993, 'grado_escolar' => 'primero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 9, 'tutor_id' => 9],
            ['id' => 50, 'nombres' => 'David', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'García', 'ci' => 700050, 'celular' => 70101014, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 10, 'tutor_id' => 10],
            ['id' => 51, 'nombres' => 'Teresa', 'apellido_paterno' => 'Salazar', 'apellido_materno' => 'Quispe', 'ci' => 700051, 'celular' => 70111116, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 11, 'tutor_id' => 1],
            ['id' => 52, 'nombres' => 'Marcos', 'apellido_paterno' => 'Rojas', 'apellido_materno' => 'Vargas', 'ci' => 700052, 'celular' => 72222227, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 12, 'tutor_id' => 2],
            ['id' => 53, 'nombres' => 'Adriana', 'apellido_paterno' => 'Choque', 'apellido_materno' => 'Flores', 'ci' => 700053, 'celular' => 73333338, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 13, 'tutor_id' => 3],
            ['id' => 54, 'nombres' => 'Pablo', 'apellido_paterno' => 'Mamani', 'apellido_materno' => 'Torrez', 'ci' => 700054, 'celular' => 74444449, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 14, 'tutor_id' => 4],
            ['id' => 55, 'nombres' => 'Tatiana', 'apellido_paterno' => 'García', 'apellido_materno' => 'Alvarez', 'ci' => 700055, 'celular' => 75555560, 'grado_escolar' => 'primero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 15, 'tutor_id' => 5],
            ['id' => 56, 'nombres' => 'Sergio', 'apellido_paterno' => 'Quispe', 'apellido_materno' => 'Ramos', 'ci' => 700056, 'celular' => 76666671, 'grado_escolar' => 'segundo', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 16, 'tutor_id' => 6],
            ['id' => 57, 'nombres' => 'Martha', 'apellido_paterno' => 'Salazar', 'apellido_materno' => 'Choque', 'ci' => 700057, 'celular' => 77777782, 'grado_escolar' => 'tercero', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 17, 'tutor_id' => 7],
            ['id' => 58, 'nombres' => 'Iván', 'apellido_paterno' => 'Torrez', 'apellido_materno' => 'Pinto', 'ci' => 700058, 'celular' => 78888883, 'grado_escolar' => 'cuarto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 18, 'tutor_id' => 8],
            ['id' => 59, 'nombres' => 'Ximena', 'apellido_paterno' => 'Flores', 'apellido_materno' => 'Mamani', 'ci' => 700059, 'celular' => 79999994, 'grado_escolar' => 'quinto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 19, 'tutor_id' => 9],
            ['id' => 60, 'nombres' => 'Álvaro', 'apellido_paterno' => 'Martínez', 'apellido_materno' => 'Rojas', 'ci' => 700060, 'celular' => 70101015, 'grado_escolar' => 'sexto', 'nivel_escolar' => 'secundaria', 'estado' => 'activo', 'colegio_id' => 20, 'tutor_id' => 10],
        ];

        foreach ($olimpistas as $olimpista) {
            Olimpista::create($olimpista);
        }
    }
}
