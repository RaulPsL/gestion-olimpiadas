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
            RolSeeder::class,
            AreaSeeder::class,
            TutorAcademicoSeeder::class,
            TutorSeeder::class,
            ColegioSeeder::class,
            UsuarioSeeder::class,
            GrupoSeeder::class,
            FaseSeeder::class,
            OlimpistaSeeder::class,
            RelationshipSeeder::class,
        ]);
    }
}
