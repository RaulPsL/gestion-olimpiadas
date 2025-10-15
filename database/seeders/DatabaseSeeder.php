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
            ColegioSeeder::class,
            TutorSeeder::class,
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
