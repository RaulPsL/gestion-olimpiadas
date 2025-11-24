<?php

namespace App\Http\Controllers;

use App\actions\FiltersAction;
use App\Models\Fase;

class ClasificasionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexArea()
    {
        try {
            $fases = Fase::with([
                'area',
                'olimpistas.colegio',
                'olimpistas.grado'
            ])
                // ->where('tipo_fase', 'finales')
                ->get();
            $fasesFiltradas = $fases->map(function ($fase) {
                $olimpistas = collect($fase->olimpistas);
                $area_fase = $fase->area->sigla;
                if (!in_array($area_fase, ['INF', 'ROB']) && !empty($olimpistas)) {
                    return $olimpistas->map(function ($olimpista) use ($fase) {
                        if ($olimpista->estado != "activo") {
                            return [
                                'fase' => $fase->sigla,
                                'area' => $fase->area->nombre,
                                'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                                'ci' => $olimpista->ci,
                                'estado' => $olimpista->estado,
                                'grado_escolar' => $olimpista->grado->nombre,
                                'nota' => $olimpista->pivot->puntaje,
                                'comentarios' => $olimpista->pivot->comentarios
                            ];
                        }
                    })->filter();
                }
            })->filter();

            $preOlimpistas = [];
            foreach ($fasesFiltradas as $value) {
                $preOlimpistas = array_merge($preOlimpistas, $value->toArray());
            }
            $olimpistasOrdenados = collect($preOlimpistas)->sortByDesc('nota')->groupBy('area');
            $olimpistas = [];
            foreach ($olimpistasOrdenados as $key => $value) {
                $nuevo_objeto = collect($value)->groupBy('estado');
                unset($nuevo_objeto['activo']);
                $olimpistas[$key] = $nuevo_objeto;
            }
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
            $fases = Fase::with([
                'area',
                'grupos.colegio',
                'grupos.olimpistas.grado'
            ])
            ->get();
            $fasesFiltradas = $fases->map(function ($fase) {
                $grupos = collect($fase->grupos);
                $area_fase = $fase->area->sigla;
                if (in_array($area_fase, ['INF', 'ROB']) && !empty($grupos)) {
                    return $grupos->map(function ($grupo) use ($fase) {
                        $integrantes = $grupo->olimpistas->map(function ($olimpista) {
                            return [
                                'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                                'ci' => $olimpista->ci,
                                'estado' => $olimpista->estado,
                                'grado_escolar' => $olimpista->grado->nombre,
                            ];
                        });
                        return [
                            'fase' => $fase->sigla,
                            'area' => $fase->area->nombre,
                            'nombre' => "$grupo->nombre",
                            'estado' => $grupo->estado,
                            'nota' => $grupo->pivot->puntaje,
                            'integrantes' => $integrantes,
                        ];
                    })->filter();
                }
            })->filter();

            $preGrupos = [];
            foreach ($fasesFiltradas as $value) {
                $preGrupos = array_merge($preGrupos, $value->toArray());
            }
            $gruposOrdenados = collect($preGrupos)->sortByDesc('nota')->groupBy('area');
            $grupos = [];
            foreach ($gruposOrdenados as $key => $value) {
                $nuevo_objeto = collect($value)->groupBy('estado');
                unset($nuevo_objeto['activo']);
                $grupos[$key] = $nuevo_objeto;
            }
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
                'area',
                'usuarios'
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
                'area',
                'usuarios.roles'
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
