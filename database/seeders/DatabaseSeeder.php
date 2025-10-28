<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AreaSeeder::class,
            NivelesSeeder::class,
            GradosSeeder::class,
            DepartamentosSeeder::class,
            ProvinciasSeeder::class,
            ColegioSeeder::class,
            UsuarioSeeder::class,
            FaseSeeder::class,
            RolSeeder::class,
            MenuSeeder::class,
            TutorAcademicoSeeder::class,
            OlimpistaSeeder::class,
            GrupoSeeder::class,
            RelationshipSeeder::class,
        ]);
    }
}
