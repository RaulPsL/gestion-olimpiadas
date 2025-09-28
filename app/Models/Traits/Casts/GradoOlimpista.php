<?php

namespace App\Models\Traits\Casts;

enum GradoOlimpista: string
{
    case Primero = 'primero';
    case Segundo = 'segundo';
    case Tercero = 'tercero';
    case Cuarto = 'cuarto';
    case Quinto = 'quinto';
    case Sexto = 'sexto';
}