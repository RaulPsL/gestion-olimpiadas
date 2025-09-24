<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Traits\Casts\TipoFase;
use App\Models\Usuario;
use Illuminate\Http\Request;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $areas = Area::with('fases.olimpistas')->get();
            return response()->json([
                'message' => "Areas obtenidas exitosamente.",
                'data' => $areas,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las areas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function indexStaticData()
    {
        try {
            $evaluadores = Usuario::whereHas('roles', 
                    function ($query) { $query->where('nombre', 'EVALUADOR'); }
                )
                ->select('ci', 'nombre', 'apellido')
                ->get()
                ->map(function ($evaluador, $index) {
                    return [
                    'id' => $index+1,
                    'value' => $evaluador->ci,
                    'label' => "$evaluador->nombre $evaluador->apellido",
                    ];
                });
            $areas = Area::all(['sigla', 'nombre'])->map(function ($area, $index) {
                return [
                    'id' => $index+1,
                    'value' => $area->sigla,
                    'label' => $area->nombre,
                ];
            });

            $fases = collect(TipoFase::cases())->map(function ($fase, $index) {
                return [
                    'id' => $index+1,
                    'value' => $fase->value,
                    'label' => $fase->name,
                ];
            });
            return response()->json([
                'message' => "Datos obtenidos exitosamente.",
                'data' => [
                    'areas' => $areas,
                    'fases' => $fases,
                    'evaluadores' => $evaluadores,
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los datos de areas, fases y evaluadores.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $area = new Area();
            $creacion_fases = false;
            $request->validate([
                'nombre' => 'required|string',
                'sigla' => 'required|string',
                'descripcion' => 'required|string',
            ]);
            $nueva_area = Area::create($request->only($area->getFillable()));
            if ($area and $request->has('fases')) {
                $request->validate([
                    'fases.*.tipo_fase' => 'required|string',
                    'fases.*.descripcion' => 'required|string',
                    'fases.*.cantidad_max_participantes' => 'required|integer',
                    'fases.*.cantidad_min_participantes' => 'required|integer',
                    'fases.*:fecha_inicio' => 'required|date',
                    'fases.*:fecha_fin' => 'required|date',
                ]);
                $nueva_area->fases()->createMany($request->fases);
                $creacion_fases = true;
            } else {
                $nueva_area->fases()->create([
                    'sigla' => $request->sigla."F1",
                    'descripcion' => 'Fase 1',
                    'cantidad_max_participantes' => 10,
                    'cantidad_min_participantes' => 20,
                    'fecha_inicio' => now(),
                    'fecha_fin' => now()->addWeeks(2),
                ]);
            }
            return response()->json([
                'message' => "Area ".$creacion_fases ? "" : "con fases "."creada exitosamente.",
                'data' => $nueva_area,
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al crear el area.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $sigla)
    {
        try {
            $area = Area::where('sigla', $sigla)->first();
            if ($area) {
                return response()->json([
                    'message' => "Area obtenida exitosamente.",
                    'data' => $area,
                ], 200);
            }
            return response()->json([
                'message' => "Area no encontrada.",
                'data' => [],
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las areas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function showByFase(string $sigla)
    {
        try {
            $areas = Area::with(['fases.olimpistas', 'fases.usuarios'])->where('sigla', $sigla)->get();
            if ($areas) {
                return response()->json([
                    'message' => "Area obtenida exitosamente.",
                    'data' => $areas,
                ], 200);
            }
            return response()->json([
                'message' => "Area no encontrada.",
                'data' => [],
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las areas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $sigla)
    {
        try {
            $area = $sigla !== '' ? Area::where('sigla', $sigla)->first() : null;
            $creacion_fases = false;
            if ($area and $request->has('fases')) {
                $request->validate([
                    'fases.*.tipo_fase' => 'required|string',
                    'fases.*.descripcion' => 'required|string',
                    'fases.*.cantidad_max_participantes' => 'required|integer',
                    'fases.*.cantidad_min_participantes' => 'required|integer',
                    'fases.*.fecha_inicio' => 'required|date',
                    'fases.*.fecha_fin' => 'required|date',
                    'fases.*.usuarios' => 'required|exists:usuarios,ci',
                ]);

                foreach ($request->fases as $faseData) {
                    $usuarios = Usuario::whereIn('ci', $faseData['usuarios'])->get();

                    $fase = $area->fases()->create([
                        'sigla' => $sigla . strtoupper(substr($faseData['tipo_fase'], 0, 3)),
                        'tipo_fase' => $faseData['tipo_fase'],
                        'descripcion' => $faseData['descripcion'] ?? 'Fase sin descripción',
                        'cantidad_max_participantes' => $faseData['cantidad_max_participantes'],
                        'cantidad_min_participantes' => $faseData['cantidad_min_participantes'],
                        'fecha_inicio' => $faseData['fecha_inicio'],
                        'fecha_fin' => $faseData['fecha_fin'],
                    ]);

                    // Relacionar la fase con los usuarios
                    $fase->usuarios()->sync($usuarios->pluck('id')->toArray());
                }
                $creacion_fases = true;
            } else {
                $area->fases()->create([
                    'sigla' => $request->sigla."F1",
                    'tipo_fase' => TipoFase::Preliminales->value,
                    'descripcion' => 'Fase 1',
                    'cantidad_max_participantes' => 10,
                    'cantidad_min_participantes' => 20,
                    'fecha_inicio' => now(),
                    'fecha_fin' => now()->addWeeks(2),
                ]);
            }
            return response()->json([
                'message' => "Area con". $creacion_fases ? " fase por defecto " : " nuevas fases " ."actualizada exitosamente.",
                'data' => $area->fases()->with('usuarios')->get(),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el area.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $sigla)
    {
        try {
            $area = Area::where('sigla', $sigla)->first();
            if ($area) {
                $area->delete();
                return response()->json([
                    'message' => "Area eliminada exitosamente.",
                    'data' => [],
                ], 200);
            }
            return response()->json([
                'message' => "Area no encontrada.",
                'data' => [],
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar el area.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
