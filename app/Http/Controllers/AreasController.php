<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Fase;
use App\Models\Nivel;
use App\Models\Traits\Casts\TipoFase;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $areas = Area::with(['fases.olimpistas', 'usuarios', 'niveles'])->get();
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

    public function indexByAreas(Request $request)
    {
        $request->validate([
            'areas' => 'required',
        ]);
        try {
            $areas = Area::with(['fases.olimpistas', 'niveles'])->whereIn('sigla', $request->areas)->get();
            $areasFiltradas = collect($areas)->map(function ($area) {
                return [
                    'name' => $area->nombre,
                    'cantidad_fases' => collect($area->fases)->count(),
                    'descripcion' => $area->descripcion,
                    'nivel' => $area->niveles,
                    'sigla' => $area->sigla,
                ];
            });
            return response()->json([
                'message' => "Areas obtenidas exitosamente.",
                'data' => $areasFiltradas,
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
            $areas = Area::whereHas(
                'usuarios.roles',
                function ($query) {
                    $query->where('sigla', 'EVA');
                }
            )
                ->with('niveles')
                ->select(['id', 'sigla', 'nombre'])
                ->get()
                ->map(function ($area, $index) {
                    $usuarios = $area->usuarios->map(function ($usuario, $index) {
                        return [
                            'id' => $index + 1,
                            'value' => $usuario->ci,
                            'label' => "$usuario->nombre $usuario->apellido",
                        ];
                    });
                    $niveles = $area->niveles->map(function ($nivel, $index) {
                        return [
                            'id' => $index + 1,
                            'value' => $nivel->id,
                            'label' => $nivel->nombre,
                        ];
                    });
                    return [
                        'id' => $index + 1,
                        'evaluadores' => $usuarios,
                        'niveles' => $niveles,
                        'value' => $area->sigla,
                        'label' => $area->nombre,
                    ];
                });

            $fases = collect(TipoFase::cases())->map(function ($fase, $index) {
                return [
                    'id' => $index + 1,
                    'value' => $fase->value,
                    'label' => $fase->name,
                ];
            });

            $usuarios = Usuario::with('roles')->get()
                ->map(function ($usuario, $index) {
                    $rol = $usuario->roles ? $usuario->roles->first()->sigla : "";
                    return  [
                        'id' => $index + 1,
                        'value' => $usuario->ci,
                        'label' => "$usuario->nombre $usuario->apellido",
                        'rol' => $rol
                    ];
                })->groupBy('rol');

            $niveles = Nivel::with('grados')
                ->get()
                ->map(function ($nivel, $index) {
                    return [
                        'id' => $index + 1,
                        'value' => $nivel->id,
                        'label' => $nivel->nombre,
                        'grados' => $nivel->grados->map(function ($grado, $index) {
                            return [
                                'id' => $index + 1,
                                'value' => $grado->id,
                                'label' => $grado->nombre,
                            ];
                        }),
                    ];
                });
            $grados = DB::table('grados')->get()
                ->map(function ($grado, $index) {
                    return [
                        'id' => $index + 1,
                        'value' => $grado->id,
                        'label' => $grado->nombre,
                    ];
                });

            return response()->json([
                'message' => "Datos obtenidos exitosamente.",
                'data' => [
                    'areas' => $areas,
                    'fases' => $fases,
                    'niveles' => $niveles,
                    'grados' => $grados,
                    'evaluadores' => $usuarios['EVA'],
                    'encargados' => $usuarios['EDA'],
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
            $request->validate([
                'nombre' => 'required|string',
                'sigla' => 'required|string',
                'descripcion' => 'required|string',
                'evaluadores' => 'required',
                'encargados' => 'required',
                'niveles' => 'required',
                'niveles.*.nombre' => 'required',
                'niveles.*.grados' => 'nullable',
            ]);
            $nueva_area = Area::with(['usuarios', 'niveles.grados'])->where('nombre', strtoupper($request->nombre))->get()->first();
            if ($nueva_area) {
                return response()->json([
                    'message' => "El area ya existe.",
                    'data' => [
                        'area' => $nueva_area,
                    ]
                ], 300);
            }
            $nueva_area = Area::create([
                'nombre' => strtoupper($request->nombre),
                'sigla' => strtoupper($request->sigla),
                'descripcion' => $request->descripcion,
            ]);
            $usuarios = array_merge(
                Usuario::whereIn('ci', $request->evaluadores)->get()->pluck('id')->toArray(),
                Usuario::whereIn('ci', $request->encargados)->get()->pluck('id')->toArray(),
                Usuario::with('roles')->whereHas('roles', function ($query) {
                    $query->where('sigla', 'ADM');
                })->get()->pluck('id')->toArray()
            );
            $niveles = collect($request->niveles)->map(
                function ($nivel) {
                    $n = Nivel::where('nombre', $nivel['nombre'])->get()->first();
                    if ($n) {
                        return $n->id;
                    }
                    $n = Nivel::create(['nombre' => $nivel['nombre']]);
                    $n->grados()->attach($nivel['grados']);
                    return $n->id;
                }
            )->toArray();
            $nueva_area->usuarios()->attach($usuarios);
            $nueva_area->niveles()->attach($niveles);
            $nueva_area = Area::with(['usuarios', 'niveles.grados'])->where('id', $nueva_area->id)->get();
            return response()->json([
                'message' => "Área creada exitosamente.",
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
                    'fases.*.cantidad_ganadores' => 'required|integer',
                    'fases.*.cantidad_min_participantes' => 'required|integer',
                    'fases.*.fecha_inicio' => 'required|date',
                    'fases.*.fecha_calificacion' => 'required|date',
                    'fases.*.fecha_fin' => 'required|date',
                    'fases.*.nivel' => 'required',
                    'fases.*.usuarios' => 'required|exists:usuarios,ci',
                    'fases.*.flash' => 'nullable',
                ]);
                $fases_creadas = collect();
                $i = 0;
                foreach ($request->fases as $faseData) {
                    $usuarios = Usuario::whereIn('ci', $faseData['usuarios'])->get();
                    $nombre_nivel = Nivel::where('id', $faseData['nivel'])->first()->nombre;
                    $nivel = strtoupper(trim($nombre_nivel));
                    $sigla_fase = $sigla . substr($nivel, 0, strlen($nivel) > 2 ? 3 : 2) . strtoupper(substr($faseData['tipo_fase'], 0, 3));
                    $fase_ = [
                        'sigla' => $sigla_fase,
                        'tipo_fase' => $faseData['tipo_fase'],
                        'descripcion' => $faseData['descripcion'] ?? 'Fase sin descripción',
                        'cantidad_max_participantes' => $faseData['cantidad_max_participantes'],
                        'cantidad_min_participantes' => $faseData['cantidad_min_participantes'],
                        'cantidad_ganadores' => $faseData['cantidad_ganadores'],
                        'fecha_inicio' => $faseData['fecha_inicio'],
                        'fecha_calificacion' => $faseData['fecha_calificacion'],
                        'fecha_fin' => $faseData['fecha_fin'],
                        'area_id' => $area->id,
                        'nivel_id' => $faseData['nivel'],
                    ];

                    if ($i > 0 && ($faseData['tipo_fase'] !== 'finales' || $faseData['tipo_fase'] !== 'preliminales')) {
                        $fase_['sigla'] = $fase_['sigla'] . $i;
                    }

                    if ($faseData['tipo_fase'] == 'finales') {
                        $i = 0;
                    }

                    $fase = Fase::create($fase_);
                    if (array_key_exists('flash', $faseData) && $faseData['flash']) {
                        $fases_ = Fase::where('sigla', 'LIKE', "%$sigla_fase%")->orderBy('fase_id', 'ASC')->get();
                        $fase_anterior = $fases_->last();
                        $fase_anterior->update(['fase_id', $fase->id]);
                    } else {
                        $fases_creadas->push($fase);
                    }
                    $fase->usuarios()->sync($usuarios->pluck('id')->toArray());
                    $i += 1;
                }
                $array_fases_creadas = $fases_creadas->toArray();
                if ($fases_creadas->count() > 0) {
                    $fases_creadas->each(function ($fase, $index) use ($array_fases_creadas) {
                        if ($fase->tipo_fase !== 'finales') {
                            $fase->update(['fase_id' => $array_fases_creadas[$index]['id']]);
                        }
                    });
                }
                $creacion_fases = true;
            } else {
                $area->fases()->create([
                    'sigla' => "PRE$request->sigla",
                    'descripcion' => "Fase preliminal del area $request->nombre",
                    'cantidad_max_participantes' => 10,
                    'cantidad_min_participantes' => 20,
                    'cantidad_ganadores' => 10,
                    'fecha_inicio' => now(),
                    'fecha_calificacion' => now()->addDays(3),
                    'fecha_fin' => now()->addDays(5),
                ]);
            }
            return response()->json([
                'message' => "Area con" . $creacion_fases ? " fase por defecto " : " nuevas fases " . "actualizada exitosamente.",
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
