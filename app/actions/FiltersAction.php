<?php

namespace App\actions;

use Illuminate\Database\Eloquent\Collection;

class FiltersAction {
    public static function filterDocs(Collection $lista) {
        return $lista->map(function ($olimpista) {
            return [
                'nombreParticipante' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                'apellidoParticipante' => "$olimpista->apellido_paterno $olimpista->apellido_materno",
                'estado' => $olimpista->estado,
                'nota' => $olimpista->pivot->puntaje,
                'colegio' => $olimpista->colegio->nombre,
                'departamento' => $olimpista->colegio->provincia->departamento->nombre,
                'provincia' => $olimpista->colegio->provincia->nombre,
            ];
        })->sortByDesc('nota')->values();
    }
    public static function filterGanadores(Collection $lista)
    {
        return $lista->map(function ($fase) {
            $encargado = collect($fase->area->usuarios)->filter(function ($usuario) {
                return collect($usuario->roles)->first()->sigla == "EDA";
            })->first();
            $integrantesConPuesto = FiltersAction::filterDocs($fase->olimpistas)
            ->map(function ($integrante, $index) { 
                $integrante['puesto'] = $index+1;
                return $integrante;
            })->values();
            return [
                'tipo_fase' => $fase->tipo_fase,
                'sigla' => $fase->sigla,
                'estado' => $fase->estado,
                'nivel' => $fase->nivel->nombre,
                'area' => $fase->area->nombre,
                'encargado' => empty($encargado) ? "" : "$encargado->nombre $encargado->apellido",
                'integrantes' => $integrantesConPuesto,
            ];
        });
    }

    public static function filterGruposGanadores(Collection $lista)
    {
        return $lista->map(function ($fase) {
            $encargado = collect($fase->area->usuarios)->filter(function ($usuario) {
                return collect($usuario->roles)->first()->sigla == "EDA";
            })->first();
            $integrantesConPuesto = FiltersAction::filterDocs($fase->olimpistas)
            ->map(function ($integrante, $index) { 
                $integrante['puesto'] = $index+1;
                return $integrante;
            });
            $grupos = $fase->grupos->map(function ($grupo) {
                return [
                    'nombre_grupo' => $grupo->nombre,
                    'integrantes' => FiltersAction::filterDocs($grupo->olimpistas),
                ];
            });
            return [
                'tipo_fase' => $fase->tipo_fase,
                'sigla' => $fase->sigla,
                'estado' => $fase->estado,
                'nivel' => $fase->nivel->nombre,
                'area' => $fase->area->nombre,
                'encargado' => empty($encargado) ? "" : "$encargado->nombre $encargado->apellido",
                'grupos' => $grupos,
            ];
        });
    }
}