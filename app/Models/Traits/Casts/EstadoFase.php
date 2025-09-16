<?php

namespace App\Models\Traits\Casts;

enum EstadoFase: string
{
    case Pendiente = 'pendiente';
    case EnCurso = 'en curso';
    case Finalizada = 'finalizada';
}