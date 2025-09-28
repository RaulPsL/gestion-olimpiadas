<?php

namespace App\Models\Traits\Casts;

enum Departamento: string
{
    case Cochabamba = 'Cochabamba';
    case LaPaz = 'La Paz';
    case Oruro = 'Oruro';
    case Potosi = 'Potosí';
    case SantaCruz = 'Santa Cruz';
    case Tarija = 'Tarija';
    case Beni = 'Beni';
    case Pando = 'Pando';
    case Chuquisaca = 'Chuquisaca';
}