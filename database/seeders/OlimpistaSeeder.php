<?php

// database/seeders/OlimpistasSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OlimpistaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $nombres = [
            'Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofía',
            'Luis', 'Valentina', 'Miguel', 'Camila', 'Jorge', 'Isabella', 'Fernando',
            'Lucía', 'Roberto', 'Daniela', 'Andrés', 'Paula', 'Ricardo', 'Gabriela',
            'Alejandro', 'Natalia', 'Manuel', 'Carolina', 'Francisco', 'Andrea',
            'Alberto', 'Fernanda', 'Héctor', 'Martina', 'Raúl', 'Victoria', 'Sergio',
            'Elena', 'Pablo', 'Julia', 'Javier', 'Claudia', 'Tomás', 'Patricia',
            'Eduardo', 'Sandra', 'César', 'Mónica', 'Óscar', 'Verónica', 'Rodrigo',
            'Adriana', 'Guillermo', 'Beatriz', 'Ignacio', 'Carmen', 'Mauricio',
            'Rosa', 'Arturo', 'Silvia', 'Felipe', 'Teresa'
        ];

        $apellidosPaternos = [
            'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández',
            'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez',
            'Díaz', 'Cruz', 'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Chávez',
            'Ruiz', 'Mendoza', 'Castillo', 'Vega', 'Vargas', 'Romero', 'Herrera',
            'Medina', 'Silva', 'Castro', 'Rojas', 'Jiménez', 'Moreno', 'Álvarez',
            'Guerrero', 'Navarro', 'Cortés', 'Campos', 'Pacheco', 'Núñez'
        ];

        $apellidosMaternos = [
            'Fernández', 'Delgado', 'Salazar', 'Aguilar', 'Maldonado', 'Ríos',
            'Espinoza', 'Benítez', 'Valdez', 'Miranda', 'Cabrera', 'Márquez',
            'Sandoval', 'Carrillo', 'Domínguez', 'Lara', 'Peña', 'Zamora',
            'Contreras', 'Soto', 'Luna', 'Vázquez', 'Paredes', 'Cárdenas',
            'Mendez', 'Acosta', 'Figueroa', 'Gallegos', 'Ponce', 'Valencia',
            'Cervantes', 'Ochoa', 'Trujillo', 'Ibarra', 'Avalos', 'Montes'
        ];

        $olimpistas = [];
        $ciBase = 8000000;
        $celularBase = 70000000;

        for ($i = 0; $i < 60; $i++) {
            // Calcular edad según el grado (grados 1-10, edades aproximadas 8-17)
            $gradoId = ($i % 10) + 1; // Distribuir entre los 10 grados (1-10)
            $edadBase = 7 + $gradoId; // 8 años para 3ro primaria, 17 para 6to secundaria
            
            // Fecha de nacimiento (año actual - edad)
            $anioNacimiento = now()->year - $edadBase;
            $mesNacimiento = rand(1, 12);
            $diaNacimiento = rand(1, 28);
            $fechaNacimiento = Carbon::create($anioNacimiento, $mesNacimiento, $diaNacimiento);

            $nombreEstudiante = $nombres[$i];
            $apellidoPaterno = $apellidosPaternos[rand(0, count($apellidosPaternos) - 1)];
            $apellidoMaterno = $apellidosMaternos[rand(0, count($apellidosMaternos) - 1)];

            $email = strtolower($nombreEstudiante) . '.' .
                    strtolower(mb_substr($apellidoPaterno, 0, 5, 'UTF-8')) .
                    $i . '@estudiante.edu.bo';

            $olimpistas[] = [
                'nombres' => $nombreEstudiante,
                'apellido_paterno' => $apellidoPaterno,
                'apellido_materno' => $apellidoMaterno,
                'estado' => 'activo',
                'ci' => $ciBase + $i * 1234,
                'celular' => $celularBase + $i * 1111,
                'grado_id' => $gradoId,
                'email' => $email,
                'fecha_nacimiento' => $fechaNacimiento,
                'colegio_id' => rand(1, 20),
                'tutor_id' => rand(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ];

        }

        DB::table('olimpistas')->insert($olimpistas);
    }
}