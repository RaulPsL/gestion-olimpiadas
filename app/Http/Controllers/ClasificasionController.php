<?php

namespace App\Http\Controllers;

use App\actions\FiltersAction;
use App\Models\Area;
use App\Models\Fase;

class ClasificasionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexArea()
    {
        try {
            $olimpistas = Area::with([
                'fases.olimpistas.colegio',
                'fases.olimpistas.grado'
            ])
                ->whereNotIn('sigla', ['INF', 'ROB'])
                ->get()
                ->map(
                    function ($area) {
                        return [
                            'nombre' => $area->nombre,
                            'descripcion' => $area->descripcion,
                            'sigla' => $area->sigla,
                            'clasificaciones' => $area->fases->flatMap(
                                function ($fase) use ($area) {
                                    return $fase->olimpistas->map(
                                        function ($olimpista) use ($fase, $area) {
                                            return [
                                                'fase' => $fase->sigla,
                                                'area' => $area->nombre,
                                                'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                                                'ci' => $olimpista->ci,
                                                'estado' => $olimpista->estado,
                                                'grado_escolar' => $olimpista->grado->nombre,
                                                'nota' => $olimpista->pivot->puntaje,
                                                'comentarios' => $olimpista->pivot->comentarios
                                            ];
                                        }
                                    );
                                }
                            )->sortByDesc('nota')->values()->groupBy('estado')
                        ];
                    }
                );
            return response()->json([
                'message' => "Finalistas obtenidos exitosamente.",
                'data' => $olimpistas,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los finalistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function indexAreaGrupo()
    {
        try {
            $grupos = Area::with([
                'fases.grupos.colegio',
                'fases.grupos.olimpistas.grado',
            ])
                ->whereIn('sigla', ['INF', 'ROB'])
                ->get()
                ->map(function ($area) {
                    return [
                        'nombre' => $area->nombre,
                        'descripcion' => $area->descripcion,
                        'sigla' => $area->sigla,
                        'clasificaciones' => $area->fases->flatMap(function ($fase) use ($area) {
                            return $fase->grupos->map(
                                function ($grupo) use ($fase, $area) {
                                    return [
                                        'fase' => $fase->sigla,
                                        'area' => $area->nombre,
                                        'nombre' => $grupo->nombre,
                                        'colegio' => $grupo->colegio->nombre,
                                        'estado' => $grupo->estado,
                                        'nota' => $grupo->pivot->puntaje,
                                        'comentarios' => $grupo->pivot->comentarios,
                                        'integrantes' => $grupo->olimpistas->map(function ($olimpista) {
                                            return [
                                                'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                                                'ci' => $olimpista->ci,
                                                'estado' => $olimpista->estado,
                                                'grado_escolar' => $olimpista->grado->nombre,
                                            ];
                                        })
                                    ];
                                }
                            );
                        })->sortByDesc('nota')->values()->groupBy('estado')
                    ];
                });
            return response()->json([
                'message' => "Clasificaciones obtenidas exitosamente.",
                'data' => $grupos,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los finalistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function ganadores()
    {
        try {
            $fases = Fase::with([
                'olimpistas',
                'nivel',
                'area.usuarios.roles',
            ])
                ->whereHas('area', function ($query) {
                    $query->whereNotIn('sigla', ['ROB', 'INF']);
                })
                ->where('tipo_fase', 'finales')
                ->where('estado', 'finalizada')
                ->get();

            $fases_grupos = Fase::with([
                'grupos',
                'nivel',
                'area.usuarios.roles',
            ])
                ->whereHas('area', function ($query) {
                    $query->whereIn('sigla', ['ROB', 'INF']);
                })
                ->where('tipo_fase', 'finales')
                ->where('estado', 'finalizada')
                ->get();

            return response()->json([
                'message' => "Ganadores obtenidos exitosamente.",
                'data' => [
                    'olimpistas' => FiltersAction::filterGanadores($fases)->groupBy('area'),
                    'grupos' => FiltersAction::filterGruposGanadores($fases_grupos)->groupBy('area'),
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los finalistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showByArea(string $sigla)
    {
        try {
            $finalistas = Fase::whereHas('area', function ($query) use ($sigla) {
                $query->where('sigla', $sigla);
            })
                ->where('tipo_fase', 'finales')
                ->with([
                    'area',
                    'olimpistas' => function ($query) {
                        $query->withPivot('puntaje', 'comentarios')
                            ->orderBy('pivot_puntaje', 'desc');
                    }
                ])
                ->first();
            if ($finalistas and  !empty($finalistas)) {
                return response()->json([
                    'message' => "Aun no se tienen finalistas.",
                    'data' => [],
                ], 204);
            }
            return response()->json([
                'message' => "Finalistas obtenidos exitosamente.",
                'data' => $finalistas,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los finalistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
