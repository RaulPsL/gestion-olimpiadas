<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuarios = [
            ['id' => 1, 'nombre' => 'Carlos', 'apellido' => 'Pérez', 'celular' => '70111111', 'email' => 'carlos.perez@example.com', 'password' => '123456', 'ci' => 1234561],
            ['id' => 2, 'nombre' => 'María', 'apellido' => 'González', 'celular' => '70222222', 'email' => 'maria.gonzalez@example.com', 'password' => '123456', 'ci' => 1234562],
            ['id' => 3, 'nombre' => 'Luis', 'apellido' => 'Rodríguez', 'celular' => '70333333', 'email' => 'luis.rodriguez@example.com', 'password' => '123456', 'ci' => 1234563],
            ['id' => 4, 'nombre' => 'Ana', 'apellido' => 'Fernández', 'celular' => '70444444', 'email' => 'ana.fernandez@example.com', 'password' => '123456', 'ci' => 1234564],
            ['id' => 5, 'nombre' => 'Jorge', 'apellido' => 'Suárez', 'celular' => '70555555', 'email' => 'jorge.suarez@example.com', 'password' => '123456', 'ci' => 1234565],
            ['id' => 6, 'nombre' => 'Elena', 'apellido' => 'Vargas', 'celular' => '70666666', 'email' => 'elena.vargas@example.com', 'password' => '123456', 'ci' => 1234566],
            ['id' => 7, 'nombre' => 'Pablo', 'apellido' => 'Castro', 'celular' => '70777777', 'email' => 'pablo.castro@example.com', 'password' => '123456', 'ci' => 1234567],
            ['id' => 8, 'nombre' => 'Lucía', 'apellido' => 'Rojas', 'celular' => '70888888', 'email' => 'lucia.rojas@example.com', 'password' => '123456', 'ci' => 1234568],
            ['id' => 9, 'nombre' => 'Diego', 'apellido' => 'Martínez', 'celular' => '70999999', 'email' => 'diego.martinez@example.com', 'password' => '123456', 'ci' => 1234569],
            ['id' => 10, 'nombre' => 'Valeria', 'apellido' => 'Mendoza', 'celular' => '70101010', 'email' => 'valeria.mendoza@example.com', 'password' => '123456', 'ci' => 1234570],
            ['id' => 11, 'nombre' => 'Sofía', 'apellido' => 'Navarro', 'celular' => '71111112', 'email' => 'sofia.navarro@example.com', 'password' => '123456', 'ci' => 1234571],
            ['id' => 12, 'nombre' => 'Miguel', 'apellido' => 'Ortega', 'celular' => '72222223', 'email' => 'miguel.ortega@example.com', 'password' => '123456', 'ci' => 1234572],
            ['id' => 13, 'nombre' => 'Natalia', 'apellido' => 'Calle', 'celular' => '73333334', 'email' => 'natalia.calle@example.com', 'password' => '123456', 'ci' => 1234573],
            ['id' => 14, 'nombre' => 'Rodrigo', 'apellido' => 'Peñaranda', 'celular' => '74444445', 'email' => 'rodrigo.penaranda@example.com', 'password' => '123456', 'ci' => 1234574],
            ['id' => 15, 'nombre' => 'Camila', 'apellido' => 'Flores', 'celular' => '75555556', 'email' => 'camila.flores@example.com', 'password' => '123456', 'ci' => 1234575],
            ['id' => 16, 'nombre' => 'Martín', 'apellido' => 'Choque', 'celular' => '76666667', 'email' => 'martin.choque@example.com', 'password' => '123456', 'ci' => 1234576],
            ['id' => 17, 'nombre' => 'Paola', 'apellido' => 'Mamani', 'celular' => '77777778', 'email' => 'paola.mamani@example.com', 'password' => '123456', 'ci' => 1234577],
            ['id' => 18, 'nombre' => 'Andrés', 'apellido' => 'Villarroel', 'celular' => '78888889', 'email' => 'andres.villarroel@example.com', 'password' => '123456', 'ci' => 1234578],
            ['id' => 19, 'nombre' => 'Verónica', 'apellido' => 'Torrez', 'celular' => '79999990', 'email' => 'veronica.torrez@example.com', 'password' => '123456', 'ci' => 1234579],
            ['id' => 20, 'nombre' => 'Hernán', 'apellido' => 'Arancibia', 'celular' => '70101011', 'email' => 'hernan.arancibia@example.com', 'password' => '123456', 'ci' => 1234580],
        ];

        foreach ($usuarios as $usuario) {
            Usuario::create($usuario);
        }
    }
}
