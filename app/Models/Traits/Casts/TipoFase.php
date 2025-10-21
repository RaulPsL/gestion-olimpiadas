<?php

namespace App\Models\Traits\Casts;

enum TipoFase: string
{
    case Preliminares = 'preliminares';
    case Clasificatorias = 'clasificatorias';
    case Finales = 'finales';
}