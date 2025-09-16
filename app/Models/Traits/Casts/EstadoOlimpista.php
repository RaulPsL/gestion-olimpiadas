<?php

namespace App\Models\Traits\Casts;

enum EstadoOlimpista: string
{
    case Vetado = 'vetado';
    case Activo = 'activo';
}