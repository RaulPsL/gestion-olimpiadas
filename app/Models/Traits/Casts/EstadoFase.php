<?php

namespace App\Models\Traits\Casts;

enum EstadoFase: string
{
    case Pendiente = 'pendiente';
    case EnCurso = 'en curso';
    case Finalizada = 'finalizada';

    /**
     * Check if the given estado is a valid case of EstadoFase.
     *
     * @param string $estado
     * @return bool
     */
    public static function isEstadoCases($estado): bool
    {
        return in_array($estado, array_column(EstadoFase::cases(), 'value'));
    }
}