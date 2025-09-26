<?php

namespace App\Models\Traits\Casts;

enum EstadoOlimpista: string
{
    case Clasificado = 'clasificado';
    case Desclasificado = 'desclasificado';
    case NoClasificado = 'no clasificado';
    case Activo = 'activo';
}