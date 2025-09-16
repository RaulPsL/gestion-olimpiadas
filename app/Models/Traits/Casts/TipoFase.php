<?php

namespace App\Models\Traits\Casts;

enum TipoFase: string
{
    case Preliminales = 'preliminales';
    case Clasificatorias = 'clasificatorias';
}