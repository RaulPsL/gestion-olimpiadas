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
            // Evaluadores
            ['id' => 1, 'nombre' => 'Carlos', 'apellido' => 'Pérez', 'celular' => '70111111', 'email' => 'carlos.perez@example.com', 'password' => '123456', 'ci' => 1234561, 'nivel_id' => 1],
            ['id' => 2, 'nombre' => 'María', 'apellido' => 'González', 'celular' => '70222222', 'email' => 'maria.gonzalez@example.com', 'password' => '123456', 'ci' => 1234562, 'nivel_id' => 2],
            ['id' => 3, 'nombre' => 'Luis', 'apellido' => 'Rodríguez', 'celular' => '70333333', 'email' => 'luis.rodriguez@example.com', 'password' => '123456', 'ci' => 1234563, 'nivel_id' => 3],
            ['id' => 4, 'nombre' => 'Ana', 'apellido' => 'Fernández', 'celular' => '70444444', 'email' => 'ana.fernandez@example.com', 'password' => '123456', 'ci' => 1234564, 'nivel_id' => 4],
            ['id' => 5, 'nombre' => 'Jorge', 'apellido' => 'Suárez', 'celular' => '70555555', 'email' => 'jorge.suarez@example.com', 'password' => '123456', 'ci' => 1234565, 'nivel_id' => 5],
            ['id' => 6, 'nombre' => 'Elena', 'apellido' => 'Vargas', 'celular' => '70666666', 'email' => 'elena.vargas@example.com', 'password' => '123456', 'ci' => 1234566, 'nivel_id' => 6],
            ['id' => 7, 'nombre' => 'Pablo', 'apellido' => 'Castro', 'celular' => '70777777', 'email' => 'pablo.castro@example.com', 'password' => '123456', 'ci' => 1234567, 'nivel_id' => 7],
            ['id' => 8, 'nombre' => 'Lucía', 'apellido' => 'Rojas', 'celular' => '70888888', 'email' => 'lucia.rojas@example.com', 'password' => '123456', 'ci' => 1234568, 'nivel_id' => 8],
            ['id' => 9, 'nombre' => 'Diego', 'apellido' => 'Martínez', 'celular' => '70999999', 'email' => 'diego.martinez@example.com', 'password' => '123456', 'ci' => 1234569, 'nivel_id' => 9],
            ['id' => 10, 'nombre' => 'Valeria', 'apellido' => 'Mendoza', 'celular' => '70101010', 'email' => 'valeria.mendoza@example.com', 'password' => '123456', 'ci' => 1234570, 'nivel_id' => 10],
            ['id' => 11, 'nombre' => 'Sofía', 'apellido' => 'Navarro', 'celular' => '71111112', 'email' => 'sofia.navarro@example.com', 'password' => '123456', 'ci' => 1234571, 'nivel_id' => 11],
            ['id' => 12, 'nombre' => 'Miguel', 'apellido' => 'Ortega', 'celular' => '72222223', 'email' => 'miguel.ortega@example.com', 'password' => '123456', 'ci' => 1234572, 'nivel_id' => 12],
            ['id' => 13, 'nombre' => 'Natalia', 'apellido' => 'Calle', 'celular' => '73333334', 'email' => 'natalia.calle@example.com', 'password' => '123456', 'ci' => 1234573, 'nivel_id' => 13],

            // Encargados (sin nivel_id)
            ['id' => 14, 'nombre' => 'Rodrigo', 'apellido' => 'Peñaranda', 'celular' => '74444445', 'email' => 'rodrigo.penaranda@example.com', 'password' => '123456', 'ci' => 1234574],
            ['id' => 15, 'nombre' => 'Camila', 'apellido' => 'Flores', 'celular' => '75555556', 'email' => 'camila.flores@example.com', 'password' => '123456', 'ci' => 1234575],
            ['id' => 16, 'nombre' => 'Martín', 'apellido' => 'Choque', 'celular' => '76666667', 'email' => 'martin.choque@example.com', 'password' => '123456', 'ci' => 1234576],
            ['id' => 17, 'nombre' => 'Paola', 'apellido' => 'Mamani', 'celular' => '77777778', 'email' => 'paola.mamani@example.com', 'password' => '123456', 'ci' => 1234577],
            ['id' => 18, 'nombre' => 'Andrés', 'apellido' => 'Villarroel', 'celular' => '78888889', 'email' => 'andres.villarroel@example.com', 'password' => '123456', 'ci' => 1234578],
            ['id' => 19, 'nombre' => 'Verónica', 'apellido' => 'Torrez', 'celular' => '79999990', 'email' => 'veronica.torrez@example.com', 'password' => '123456', 'ci' => 1234579],
            ['id' => 20, 'nombre' => 'Hernán', 'apellido' => 'Arancibia', 'celular' => '70101011', 'email' => 'hernan.arancibia@example.com', 'password' => '123456', 'ci' => 1234580],

            // Admin
            ['id' => 21, 'nombre' => 'Antonio', 'apellido' => 'Garnica', 'celular' => '70202022', 'email' => 'antonio.garnica@example.com', 'password' => '123456', 'ci' => 1234581],

            // Evaluadores (22–60)
            ['id' => 22, 'nombre' => 'María', 'apellido' => 'Quispe', 'celular' => '72345678', 'email' => 'maria.quispe@email.com', 'password' => '123456', 'ci' => 1234582, 'nivel_id' => 14],
            ['id' => 23, 'nombre' => 'Roberto', 'apellido' => 'Fernández', 'celular' => '73456789', 'email' => 'roberto.fernandez@email.com', 'password' => '123456', 'ci' => 1234583, 'nivel_id' => 15],
            ['id' => 24, 'nombre' => 'Ana', 'apellido' => 'Vargas', 'celular' => '74567890', 'email' => 'ana.vargas@email.com', 'password' => '123456', 'ci' => 1234584, 'nivel_id' => 16],
            ['id' => 25, 'nombre' => 'Diego', 'apellido' => 'Mamani', 'celular' => '75678901', 'email' => 'diego.mamani@email.com', 'password' => '123456', 'ci' => 1234585, 'nivel_id' => 17],
            ['id' => 26, 'nombre' => 'Lucía', 'apellido' => 'Rojas', 'celular' => '76789012', 'email' => 'lucia.rojas@email.com', 'password' => '123456', 'ci' => 1234586, 'nivel_id' => 18],
            ['id' => 27, 'nombre' => 'Javier', 'apellido' => 'Torrez', 'celular' => '77890123', 'email' => 'javier.torrez@email.com', 'password' => '123456', 'ci' => 1234587, 'nivel_id' => 19],
            ['id' => 28, 'nombre' => 'Sofía', 'apellido' => 'Condori', 'celular' => '78901234', 'email' => 'sofia.condori@email.com', 'password' => '123456', 'ci' => 1234588, 'nivel_id' => 20],
            ['id' => 29, 'nombre' => 'Miguel', 'apellido' => 'Pinto', 'celular' => '79012345', 'email' => 'miguel.pinto@email.com', 'password' => '123456', 'ci' => 1234589, 'nivel_id' => 21],
            ['id' => 30, 'nombre' => 'Valentina', 'apellido' => 'Apaza', 'celular' => '70123456', 'email' => 'valentina.apaza@email.com', 'password' => '123456', 'ci' => 1234590, 'nivel_id' => 22],
            ['id' => 31, 'nombre' => 'Fernando', 'apellido' => 'Gutiérrez', 'celular' => '71345678', 'email' => 'fernando.gutierrez@email.com', 'password' => '123456', 'ci' => 1234591, 'nivel_id' => 23],
            ['id' => 32, 'nombre' => 'Isabella', 'apellido' => 'Choque', 'celular' => '72456789', 'email' => 'isabella.choque@email.com', 'password' => '123456', 'ci' => 1234592, 'nivel_id' => 24],
            ['id' => 33, 'nombre' => 'Andrés', 'apellido' => 'Sánchez', 'celular' => '73567890', 'email' => 'andres.sanchez@email.com', 'password' => '123456', 'ci' => 1234593, 'nivel_id' => 25],
            ['id' => 34, 'nombre' => 'Camila', 'apellido' => 'Flores', 'celular' => '74678901', 'email' => 'camila.flores@email.com', 'password' => '123456', 'ci' => 1234594, 'nivel_id' => 26],
            ['id' => 35, 'nombre' => 'Sebastián', 'apellido' => 'Morales', 'celular' => '75789012', 'email' => 'sebastian.morales@email.com', 'password' => '123456', 'ci' => 1234595, 'nivel_id' => 1],
            ['id' => 36, 'nombre' => 'Daniela', 'apellido' => 'Huanca', 'celular' => '76890123', 'email' => 'daniela.huanca@email.com', 'password' => '123456', 'ci' => 1234596, 'nivel_id' => 2],
            ['id' => 37, 'nombre' => 'Mateo', 'apellido' => 'Castro', 'celular' => '77901234', 'email' => 'mateo.castro@email.com', 'password' => '123456', 'ci' => 1234597, 'nivel_id' => 3],
            ['id' => 38, 'nombre' => 'Gabriela', 'apellido' => 'Limachi', 'celular' => '78012345', 'email' => 'gabriela.limachi@email.com', 'password' => '123456', 'ci' => 1234598, 'nivel_id' => 4],
            ['id' => 39, 'nombre' => 'Nicolás', 'apellido' => 'Ramírez', 'celular' => '79123456', 'email' => 'nicolas.ramirez@email.com', 'password' => '123456', 'ci' => 1234599, 'nivel_id' => 5],
            ['id' => 40, 'nombre' => 'Valeria', 'apellido' => 'Challapa', 'celular' => '70234567', 'email' => 'valeria.challapa@email.com', 'password' => '123456', 'ci' => 1234600, 'nivel_id' => 6],

            ['id' => 41, 'nombre' => 'Andrea', 'apellido' => 'Salazar', 'celular' => '70311111', 'email' => 'andrea.salazar@email.com', 'password' => '123456', 'ci' => 1234601, 'nivel_id' => 7],
            ['id' => 42, 'nombre' => 'Ricardo', 'apellido' => 'Villegas', 'celular' => '70422222', 'email' => 'ricardo.villegas@email.com', 'password' => '123456', 'ci' => 1234602, 'nivel_id' => 8],
            ['id' => 43, 'nombre' => 'Laura', 'apellido' => 'Maldonado', 'celular' => '70533333', 'email' => 'laura.maldonado@email.com', 'password' => '123456', 'ci' => 1234603, 'nivel_id' => 9],
            ['id' => 44, 'nombre' => 'Tomás', 'apellido' => 'Rivera', 'celular' => '70644444', 'email' => 'tomas.rivera@email.com', 'password' => '123456', 'ci' => 1234604, 'nivel_id' => 10],
            ['id' => 45, 'nombre' => 'Carla', 'apellido' => 'Huallpa', 'celular' => '70755555', 'email' => 'carla.huallpa@email.com', 'password' => '123456', 'ci' => 1234605, 'nivel_id' => 11],
            ['id' => 46, 'nombre' => 'Mauricio', 'apellido' => 'Paz', 'celular' => '70866666', 'email' => 'mauricio.paz@email.com', 'password' => '123456', 'ci' => 1234606, 'nivel_id' => 12],
            ['id' => 47, 'nombre' => 'Patricia', 'apellido' => 'Gómez', 'celular' => '70977777', 'email' => 'patricia.gomez@email.com', 'password' => '123456', 'ci' => 1234607, 'nivel_id' => 13],
            ['id' => 48, 'nombre' => 'Cristian', 'apellido' => 'Montes', 'celular' => '71088888', 'email' => 'cristian.montes@email.com', 'password' => '123456', 'ci' => 1234608, 'nivel_id' => 14],
            ['id' => 49, 'nombre' => 'Roxana', 'apellido' => 'Medina', 'celular' => '71199999', 'email' => 'roxana.medina@email.com', 'password' => '123456', 'ci' => 1234609, 'nivel_id' => 15],
            ['id' => 50, 'nombre' => 'Hugo', 'apellido' => 'Quiroga', 'celular' => '71201010', 'email' => 'hugo.quiroga@email.com', 'password' => '123456', 'ci' => 1234610, 'nivel_id' => 16],
            ['id' => 51, 'nombre' => 'Marisol', 'apellido' => 'Tapia', 'celular' => '71312121', 'email' => 'marisol.tapia@email.com', 'password' => '123456', 'ci' => 1234611, 'nivel_id' => 17],
            ['id' => 52, 'nombre' => 'Rafael', 'apellido' => 'Blanco', 'celular' => '71423232', 'email' => 'rafael.blanco@email.com', 'password' => '123456', 'ci' => 1234612, 'nivel_id' => 18],
            ['id' => 53, 'nombre' => 'Cecilia', 'apellido' => 'Mamani', 'celular' => '71534343', 'email' => 'cecilia.mamani@email.com', 'password' => '123456', 'ci' => 1234613, 'nivel_id' => 19],
            ['id' => 54, 'nombre' => 'Julio', 'apellido' => 'Serrano', 'celular' => '71645454', 'email' => 'julio.serrano@email.com', 'password' => '123456', 'ci' => 1234614, 'nivel_id' => 20],
            ['id' => 55, 'nombre' => 'Beatriz', 'apellido' => 'Choque', 'celular' => '71756565', 'email' => 'beatriz.choque@email.com', 'password' => '123456', 'ci' => 1234615, 'nivel_id' => 21],
            ['id' => 56, 'nombre' => 'Felipe', 'apellido' => 'Mendoza', 'celular' => '71867676', 'email' => 'felipe.mendoza@email.com', 'password' => '123456', 'ci' => 1234616, 'nivel_id' => 22],
            ['id' => 57, 'nombre' => 'Tamara', 'apellido' => 'Condori', 'celular' => '71978787', 'email' => 'tamara.condori@email.com', 'password' => '123456', 'ci' => 1234617, 'nivel_id' => 23],
            ['id' => 58, 'nombre' => 'Gonzalo', 'apellido' => 'Rojas', 'celular' => '72089898', 'email' => 'gonzalo.rojas@email.com', 'password' => '123456', 'ci' => 1234618, 'nivel_id' => 24],
            ['id' => 59, 'nombre' => 'Daniela', 'apellido' => 'Santos', 'celular' => '72190909', 'email' => 'daniela.santos@email.com', 'password' => '123456', 'ci' => 1234619, 'nivel_id' => 25],
            ['id' => 60, 'nombre' => 'Oscar', 'apellido' => 'Camacho', 'celular' => '72202020', 'email' => 'oscar.camacho@email.com', 'password' => '123456', 'ci' => 1234620, 'nivel_id' => 26],
        ];

        foreach ($usuarios as $usuario) {
            Usuario::create($usuario);
        }
    }
}
