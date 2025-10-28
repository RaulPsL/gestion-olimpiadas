<?php

// database/seeders/ProvinciasSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $provincias = [
            // Chuquisaca (departamento_id: 1) - 10 provincias
            ['nombre' => 'Oropeza', 'sigla' => 'ORP', 'departamento_id' => 1],
            ['nombre' => 'Azurduy', 'sigla' => 'AZU', 'departamento_id' => 1],
            ['nombre' => 'Zudáñez', 'sigla' => 'ZUD', 'departamento_id' => 1],
            ['nombre' => 'Tomina', 'sigla' => 'TOM', 'departamento_id' => 1],
            ['nombre' => 'Hernando Siles', 'sigla' => 'HSI', 'departamento_id' => 1],
            ['nombre' => 'Yamparáez', 'sigla' => 'YAM', 'departamento_id' => 1],
            ['nombre' => 'Nor Cinti', 'sigla' => 'NCI', 'departamento_id' => 1],
            ['nombre' => 'Sud Cinti', 'sigla' => 'SCI', 'departamento_id' => 1],
            ['nombre' => 'Belisario Boeto', 'sigla' => 'BBO', 'departamento_id' => 1],
            ['nombre' => 'Luis Calvo', 'sigla' => 'LCA', 'departamento_id' => 1],

            // La Paz (departamento_id: 2) - 20 provincias
            ['nombre' => 'Murillo', 'sigla' => 'MUR', 'departamento_id' => 2],
            ['nombre' => 'Omasuyos', 'sigla' => 'OMA', 'departamento_id' => 2],
            ['nombre' => 'Pacajes', 'sigla' => 'PAC', 'departamento_id' => 2],
            ['nombre' => 'Camacho', 'sigla' => 'CAM', 'departamento_id' => 2],
            ['nombre' => 'Muñecas', 'sigla' => 'MUÑ', 'departamento_id' => 2],
            ['nombre' => 'Larecaja', 'sigla' => 'LAR', 'departamento_id' => 2],
            ['nombre' => 'Franz Tamayo', 'sigla' => 'FTA', 'departamento_id' => 2],
            ['nombre' => 'Ingavi', 'sigla' => 'ING', 'departamento_id' => 2],
            ['nombre' => 'Loayza', 'sigla' => 'LOA', 'departamento_id' => 2],
            ['nombre' => 'Inquisivi', 'sigla' => 'INQ', 'departamento_id' => 2],
            ['nombre' => 'Sud Yungas', 'sigla' => 'SYU', 'departamento_id' => 2],
            ['nombre' => 'Los Andes', 'sigla' => 'AND', 'departamento_id' => 2],
            ['nombre' => 'Aroma', 'sigla' => 'ARO', 'departamento_id' => 2],
            ['nombre' => 'Nor Yungas', 'sigla' => 'NYU', 'departamento_id' => 2],
            ['nombre' => 'Abel Iturralde', 'sigla' => 'AIT', 'departamento_id' => 2],
            ['nombre' => 'Bautista Saavedra', 'sigla' => 'BSA', 'departamento_id' => 2],
            ['nombre' => 'Manco Kapac', 'sigla' => 'MKA', 'departamento_id' => 2],
            ['nombre' => 'Gualberto Villarroel', 'sigla' => 'GVI', 'departamento_id' => 2],
            ['nombre' => 'General José Manuel Pando', 'sigla' => 'PAN', 'departamento_id' => 2],
            ['nombre' => 'Caranavi', 'sigla' => 'CRV', 'departamento_id' => 2],

            // Cochabamba (departamento_id: 3) - 16 provincias
            ['nombre' => 'Cercado', 'sigla' => 'CER', 'departamento_id' => 3],
            ['nombre' => 'Arani', 'sigla' => 'ARA', 'departamento_id' => 3],
            ['nombre' => 'Arque', 'sigla' => 'ARQ', 'departamento_id' => 3],
            ['nombre' => 'Ayopaya', 'sigla' => 'AYO', 'departamento_id' => 3],
            ['nombre' => 'Campero', 'sigla' => 'CAM', 'departamento_id' => 3],
            ['nombre' => 'Capinota', 'sigla' => 'CAP', 'departamento_id' => 3],
            ['nombre' => 'Carrasco', 'sigla' => 'CRR', 'departamento_id' => 3],
            ['nombre' => 'Chapare', 'sigla' => 'CHP', 'departamento_id' => 3],
            ['nombre' => 'Esteban Arce', 'sigla' => 'EAR', 'departamento_id' => 3],
            ['nombre' => 'Germán Jordán', 'sigla' => 'GJO', 'departamento_id' => 3],
            ['nombre' => 'Mizque', 'sigla' => 'MIZ', 'departamento_id' => 3],
            ['nombre' => 'Punata', 'sigla' => 'PUN', 'departamento_id' => 3],
            ['nombre' => 'Quillacollo', 'sigla' => 'QUI', 'departamento_id' => 3],
            ['nombre' => 'Tapacarí', 'sigla' => 'TAP', 'departamento_id' => 3],
            ['nombre' => 'Tiraque', 'sigla' => 'TIR', 'departamento_id' => 3],
            ['nombre' => 'Bolívar', 'sigla' => 'BOL', 'departamento_id' => 3],

            // Oruro (departamento_id: 4) - 16 provincias
            ['nombre' => 'Cercado', 'sigla' => 'CER', 'departamento_id' => 4],
            ['nombre' => 'Abaroa', 'sigla' => 'ABA', 'departamento_id' => 4],
            ['nombre' => 'Carangas', 'sigla' => 'CRG', 'departamento_id' => 4],
            ['nombre' => 'Cercado', 'sigla' => 'CER', 'departamento_id' => 4],
            ['nombre' => 'Eduardo Avaroa', 'sigla' => 'EAV', 'departamento_id' => 4],
            ['nombre' => 'Ladislao Cabrera', 'sigla' => 'LCA', 'departamento_id' => 4],
            ['nombre' => 'Litoral', 'sigla' => 'LIT', 'departamento_id' => 4],
            ['nombre' => 'Nor Carangas', 'sigla' => 'NCR', 'departamento_id' => 4],
            ['nombre' => 'Pantaleón Dalence', 'sigla' => 'PDA', 'departamento_id' => 4],
            ['nombre' => 'Poopó', 'sigla' => 'POO', 'departamento_id' => 4],
            ['nombre' => 'Sajama', 'sigla' => 'SAJ', 'departamento_id' => 4],
            ['nombre' => 'San Pedro de Totora', 'sigla' => 'SPT', 'departamento_id' => 4],
            ['nombre' => 'Saucarí', 'sigla' => 'SAU', 'departamento_id' => 4],
            ['nombre' => 'Sebastián Pagador', 'sigla' => 'SPA', 'departamento_id' => 4],
            ['nombre' => 'Sud Carangas', 'sigla' => 'SCR', 'departamento_id' => 4],
            ['nombre' => 'Tomás Barrón', 'sigla' => 'TBA', 'departamento_id' => 4],

            // Potosí (departamento_id: 5) - 16 provincias
            ['nombre' => 'Tomás Frías', 'sigla' => 'TFR', 'departamento_id' => 5],
            ['nombre' => 'Rafael Bustillo', 'sigla' => 'RBU', 'departamento_id' => 5],
            ['nombre' => 'Cornelio Saavedra', 'sigla' => 'CSA', 'departamento_id' => 5],
            ['nombre' => 'Chayanta', 'sigla' => 'CHY', 'departamento_id' => 5],
            ['nombre' => 'Charcas', 'sigla' => 'CHR', 'departamento_id' => 5],
            ['nombre' => 'Nor Chichas', 'sigla' => 'NCH', 'departamento_id' => 5],
            ['nombre' => 'Alonso de Ibáñez', 'sigla' => 'AIB', 'departamento_id' => 5],
            ['nombre' => 'Sur Chichas', 'sigla' => 'SCH', 'departamento_id' => 5],
            ['nombre' => 'Nor Lípez', 'sigla' => 'NLI', 'departamento_id' => 5],
            ['nombre' => 'Sur Lípez', 'sigla' => 'SLI', 'departamento_id' => 5],
            ['nombre' => 'José María Linares', 'sigla' => 'JML', 'departamento_id' => 5],
            ['nombre' => 'Antonio Quijarro', 'sigla' => 'AQU', 'departamento_id' => 5],
            ['nombre' => 'Bernardino Bilbao', 'sigla' => 'BBI', 'departamento_id' => 5],
            ['nombre' => 'Daniel Campos', 'sigla' => 'DCA', 'departamento_id' => 5],
            ['nombre' => 'Modesto Omiste', 'sigla' => 'MOM', 'departamento_id' => 5],
            ['nombre' => 'Enrique Baldivieso', 'sigla' => 'EBA', 'departamento_id' => 5],

            // Tarija (departamento_id: 6) - 6 provincias
            ['nombre' => 'Cercado', 'sigla' => 'CER', 'departamento_id' => 6],
            ['nombre' => 'Aniceto Arce', 'sigla' => 'AAR', 'departamento_id' => 6],
            ['nombre' => 'Gran Chaco', 'sigla' => 'GCH', 'departamento_id' => 6],
            ['nombre' => 'José María Avilés', 'sigla' => 'JMA', 'departamento_id' => 6],
            ['nombre' => 'Méndez', 'sigla' => 'MEN', 'departamento_id' => 6],
            ['nombre' => 'Burnet O\'Connor', 'sigla' => 'BOC', 'departamento_id' => 6],

            // Santa Cruz (departamento_id: 7) - 15 provincias
            ['nombre' => 'Andrés Ibáñez', 'sigla' => 'AIB', 'departamento_id' => 7],
            ['nombre' => 'Warnes', 'sigla' => 'WAR', 'departamento_id' => 7],
            ['nombre' => 'Velasco', 'sigla' => 'VEL', 'departamento_id' => 7],
            ['nombre' => 'Ichilo', 'sigla' => 'ICH', 'departamento_id' => 7],
            ['nombre' => 'Chiquitos', 'sigla' => 'CHI', 'departamento_id' => 7],
            ['nombre' => 'Sara', 'sigla' => 'SAR', 'departamento_id' => 7],
            ['nombre' => 'Cordillera', 'sigla' => 'COR', 'departamento_id' => 7],
            ['nombre' => 'Vallegrande', 'sigla' => 'VAL', 'departamento_id' => 7],
            ['nombre' => 'Florida', 'sigla' => 'FLO', 'departamento_id' => 7],
            ['nombre' => 'Obispo Santistevan', 'sigla' => 'OSA', 'departamento_id' => 7],
            ['nombre' => 'Ñuflo de Chávez', 'sigla' => 'ÑCH', 'departamento_id' => 7],
            ['nombre' => 'Ángel Sandoval', 'sigla' => 'ASA', 'departamento_id' => 7],
            ['nombre' => 'Caballero', 'sigla' => 'CAB', 'departamento_id' => 7],
            ['nombre' => 'Germán Busch', 'sigla' => 'GBU', 'departamento_id' => 7],
            ['nombre' => 'Guarayos', 'sigla' => 'GUA', 'departamento_id' => 7],

            // Beni (departamento_id: 8) - 8 provincias
            ['nombre' => 'Cercado', 'sigla' => 'CER', 'departamento_id' => 8],
            ['nombre' => 'Vaca Díez', 'sigla' => 'VDI', 'departamento_id' => 8],
            ['nombre' => 'José Ballivián', 'sigla' => 'JBA', 'departamento_id' => 8],
            ['nombre' => 'Yacuma', 'sigla' => 'YAC', 'departamento_id' => 8],
            ['nombre' => 'Moxos', 'sigla' => 'MOX', 'departamento_id' => 8],
            ['nombre' => 'Marbán', 'sigla' => 'MAR', 'departamento_id' => 8],
            ['nombre' => 'Mamoré', 'sigla' => 'MAM', 'departamento_id' => 8],
            ['nombre' => 'Iténez', 'sigla' => 'ITE', 'departamento_id' => 8],

            // Pando (departamento_id: 9) - 5 provincias
            ['nombre' => 'Nicolás Suárez', 'sigla' => 'NSU', 'departamento_id' => 9],
            ['nombre' => 'Manuripi', 'sigla' => 'MAN', 'departamento_id' => 9],
            ['nombre' => 'Madre de Dios', 'sigla' => 'MDD', 'departamento_id' => 9],
            ['nombre' => 'Abuná', 'sigla' => 'ABU', 'departamento_id' => 9],
            ['nombre' => 'Federico Román', 'sigla' => 'FRO', 'departamento_id' => 9],
        ];

        DB::table('provincias')->insert($provincias);
    }
}
