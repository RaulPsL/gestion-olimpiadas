<?php

namespace App\Http\Controllers;

use App\Events\FaseNotification;
use App\Events\FaseUpdate;
use App\Models\Area;
use App\Models\Fase;
use App\Models\Traits\Casts\EstadoFase;
use App\Models\Usuario;
use App\Models\VerificacionCierre;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'areas' => 'required'
            ]);
            $fases = Fase::with(['area', 'nivel', 'olimpistas'])->get();
            $fasesFiltradas = collect($fases)->map(function ($fase) {
                return [
                    'fase_id' => $fase->id,
                    'name' => $fase->sigla,
                    'tipo_fase' => $fase->tipo_fase,
                    'area' => $fase->area->nombre,
                    'cantidad_participantes' => collect($fase->olimpistas)->count(),
                    'fecha_inicio' => $fase->fecha_inicio,
                    'fecha_calificacion' => $fase->fecha_calificacion,
                    'fecha_fin' => $fase->fecha_fin,
                    'cantidad_ganadores' => $fase->cantidad_ganadores,
                    'estado' => $fase->estado,
                    'nivel' => $fase->nivel->nombre,
                ];
            })->groupBy('area');
            $fasesPorArea = [];
            foreach ($request->areas as $key) {
                if (array_key_exists($key, $fasesFiltradas->toArray())) {
                    $fasesPorArea[$key] = $fasesFiltradas[$key];
                }
            }
            return response()->json([
                'message' => "Fases obtenidas exitosamente.",
                'data' => $fasesPorArea,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function indexCalendar()
    {
        try {
            $fases = Fase::with(['area', 'nivel', 'olimpistas'])->get()->map(function ($fase, $index) {
                $area = $fase->area;
                $nivel = $fase->nivel;
                $nombre_nivel = $nivel ? "$nivel->nombre" : "";
                $area_nombre = strtolower($area->nombre);
                return [
                    'id' => $index + 1,
                    'title' => "$area_nombre - $nombre_nivel",
                    'start' => $fase->fecha_inicio,
                    'calificacion' => $fase->fecha_calificacion,
                    'end' => $fase->fecha_fin,
                    'resource' => [
                        'state_fase' => $fase->estado,
                        'area' => $area->nombre,
                        'participants' => collect($fase->olimpistas)->count(),
                        'type' => $fase->tipo_fase,
                        'state' => $fase->estado,
                    ]
                ];
            })->sortBy('start', SORT_ASC)->values();
            event(new FaseUpdate());
            return response()->json([
                'message' => "Fases obtenidas exitosamente.",
                'data' => $fases,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function indexCierreFases(Request $request)
    {
        try {
            $request->validate([
                'areas' => 'required'
            ]);
            $cierres = Fase::with(['area', 'cierre.encargado', 'cierre.evaluador'])->get();
            $cierresFiltrados = collect($cierres)->map(function ($fase) {
                $encargado = $fase->cierre ? $fase->cierre->encargado : null;
                $evaluador = $fase->cierre ? $fase->cierre->evaluador : null;
                $area = $fase->area;
                $nuevo_cierre = [
                    'encargado' => $encargado ? "$encargado->nombre $encargado->apellido" : "",
                    'evaluador' => $evaluador ? "$evaluador->nombre $evaluador->apellido" : "",
                    'fase' => "$fase->sigla - $area->nombre",
                    'estado' => $fase->estado,
                    'area' => $fase->area->nombre,
                    'tipo_fase' => $fase->tipo_fase,
                    'fecha_creacion' => $fase->cierre ? date('d/M/Y H:i', strtotime($fase->cierre->created_at)) : "",
                    'fecha_modificacion' => $fase->cierre ? date('d/M/Y H:i', strtotime($fase->cierre->updated_at)) : "",
                    'fecha_fin_fase' => $fase->fecha_fin,
                    'fecha_calificacion_fase' => $fase->fecha_calificacion,
                    'usuario_encargado_id' => $encargado ? "$encargado->ci" : null,
                    'usuario_evaluador_id' => $evaluador ? "$evaluador->ci" : null,
                    'fase_id' => $fase->id,
                ];

                return $nuevo_cierre;
            })->groupBy('area');

            $cierresArea = [];
            foreach ($request->areas as $key) {
                if (array_key_exists($key, $cierresFiltrados->toArray())) {
                    $cierresArea[$key] = $cierresFiltrados[$key];
                }
            }
            return response()->json([
                'message' => "Cierres de fases obtenidos exitosamente.",
                'data' => $cierresArea,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function update(Request $request, int $id)
    {
        try {
            $fase = Fase::findOrFail($id);
            if (!$fase) {
                return response()->json([
                    'message' => "No se encontró la fase $id.",
                ], 400);
            }
            $fase->update([
                "fecha_inicio" => $request->fecha_inicio,
                "fecha_fin" => $request->fecha_fin,
                "fecha_calificacion" => $request->fecha_calificacion,
                "cantidad_ganadores" => $request->cantidad_ganadores,
                "evaluadores" => $request->evaluadores,
            ]);
            return response()->json([
                'message' => "La fase $id se actualizo correctamente.",
                'data' => $fase,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al modificar la fase.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function createCierre(Request $request)
    {
        try {
            $request->validate([
                'fase_id' => 'required',
            ]);

            $cierre = VerificacionCierre::where('fase_id', $request->fase_id)->first();
            $fase_actual = Fase::findOrFail($request->fase_id);
            $usuarios = [];
            if ($request->has('usuario_encargado_id') && $request->usuario_encargado_id > 0) {
                $usuarios['usuario_encargado_id'] = Usuario::where('ci', $request->usuario_encargado_id)->first()->id;
            }
            if ($request->has('usuario_evaluador_id') && $request->usuario_evaluador_id > 0) {
                $usuarios['usuario_evaluador_id'] = Usuario::where('ci', $request->usuario_evaluador_id)->first()->id;
            }
            if ($cierre) {
                $cierre->update($usuarios);
                $cierre->refresh();
                if (!empty($cierre->usuario_evaluador_id) && !empty($cierre->usuario_evaluador_id)) {
                    $fase_actual->update(['estado' => 'finalizada']);
                    $usuarios = Usuario::whereIn('id', array_values($usuarios))->get()->map(function ($usuario) {
                        return "$usuario->nombre $usuario->apellido - $usuario->ci";
                    });
                    $nombre_usuarios = implode(',', $usuarios->toArray());
                    event(new FaseNotification("La fase: $fase_actual->sigla ha sido cerrada por los usuarios: $nombre_usuarios.", 1234581));
                }
            } else {
                $usuarios['fase_id'] = $request->fase_id;
                $cierre = VerificacionCierre::create($usuarios);
                $fase_actual->update(['estado' => 'pendiente']);
            }
            return response()->json([
                'message' => "Verificacion de cierre de fases ejecutada con exito.",
                'data' => [
                    'cierre' => VerificacionCierre::where('fase_id', $request->fase_id)->first(),
                    'fase' => $fase_actual,
                ],
            ], 202);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
                'cierre' => VerificacionCierre::where('fase_id', $request->fase_id)->first(),
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateCierre(Request $request)
    {
        try {
            $request->validate([
                'fase_id' => 'required',
                'aumento_fin' => 'required|integer',
            ]);

            $cierre = VerificacionCierre::where('fase_id', $request->fase_id)->get()->first();
            $fase_actual = Fase::findOrFail($request->fase_id);
            $fases = Fase::where('area_id', $fase_actual->area_id)->get();
            $index_fase = array_search($fase_actual->id, $fases->pluck('id')->toArray());

            if ($cierre) {
                $cierre->update(['usuario_encargado_id' => null, 'usuario_evaluador_id' => null]);

                $anterior_fin = Carbon::parse($fase_actual->fecha_fin);
                $anterior_calificacion = Carbon::parse($fase_actual->fecha_calificacion);

                $diff_minutos = (int)$request->aumento_fin;

                $nuevo_tiempo_fin = $anterior_fin->copy()->addMinutes($diff_minutos);
                $nuevo_tiempo_calificacion = $anterior_calificacion->copy()->addMinutes($diff_minutos);

                $fase_actual->update([
                    'fecha_fin' => $nuevo_tiempo_fin,
                    'fecha_calificacion' => $nuevo_tiempo_calificacion,
                    'estado' => 'pendiente',
                ]);
                
                $fases = collect();

                while ($fase_actual) {
                    $fases->push($fase_actual);
                    $fase_actual = $fase_actual->fase_siguiente();
                }

                $fases->each(function ($fase) use ($diff_minutos) {
                    $fase->update([
                        'fecha_inicio' => Carbon::parse($fase->fecha_inicio)->addMinutes($diff_minutos),
                        'fecha_fin' => Carbon::parse($fase->fecha_fin)->addMinutes($diff_minutos),
                        'fecha_calificacion' => Carbon::parse($fase->fecha_calificacion)->addMinutes($diff_minutos),
                        'estado' => 'pendiente'
                    ]);
                });
            }
            return response()->json([
                'message' => "Verificacion de cierre de fases ejecutada con exito.",
                'data' => [
                    'cierre' => VerificacionCierre::where('fase_id', $request->fase_id)->get(),
                    'fase' => $fase_actual,
                ],
            ], 202);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar las fases.',
                'cierre' => VerificacionCierre::where('fase_id', $request->fase_id)->first(),
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try {
            $request->validate([
                'fases' => 'required',
                'area' => 'required|exists:areas,sigla',
                'fases.*.id' => 'required|exists:fases,id',
            ]);
            if ($request->has('fases')) {
                $fases = Area::where('sigla', $request->area)->with('fases')->first()->fases;
                $fases_a_eliminar = array_diff(
                    $fases->pluck('id')->toArray(),
                    array_column($request->fases, 'id')
                );
                Fase::whereIn('id', $fases_a_eliminar)->delete();
                return response()->json([
                    'message' => "Fases eliminadas exitosamente.",
                    'data' => Area::where('sigla', $request->area)->fases()->first()->fases,
                ], 200);
            }
            return response()->json([
                'message' => "No se enviaron fases en la petición.",
                'data' => [],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar las fases.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
