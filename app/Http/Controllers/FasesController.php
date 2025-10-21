<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Fase;
use App\Models\Traits\Casts\EstadoFase;
use App\Models\Usuario;
use App\Models\VerificacionCierre;
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
            $fases = Fase::with('area')->get();
            $fasesFiltradas = collect($fases)->map(function ($fase) {
                return[
                    'name' => $fase->sigla,
                    'tipo_fase' => $fase->tipo_fase,
                    'area' => $fase->area->nombre,
                    'cantidad_participantes' => collect($fase->olimpistas())->count(),
                    'fecha_inicio' => date('d/M/Y', strtotime($fase->fecha_inicio)),
                    'fecha_fin' => date('d/M/Y', strtotime($fase->fecha_fin)),
                    'estado' => $fase->estado,
                ];
            })->groupBy('area');
            $fasesPorArea = [];
            foreach ($request->areas as $key) {
                $fasesPorArea[$key] = $fasesFiltradas[$key];
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

    public function indexCierreFases(Request $request) {
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
                    'fecha_creacion' => $fase->cierre ? date('d/M/Y H:i', strtotime($fase->cierre->created_at)) : "" ,
                    'fecha_modificacion' => $fase->cierre ? date('d/M/Y H:i', strtotime($fase->cierre->updated_at)) : "" ,
                    'fecha_fin_fase' => date('d/M/Y H:i', strtotime($fase->fecha_fin)),
                    'fecha_calificacion_fase' => date('d/M/Y H:i', strtotime($fase->fecha_calificacion)),
                    'usuario_encargado_id' => $fase->cierre ? $fase->cierre->usuario_encargado_id : null ,
                    'usuario_evaluador_id' => $fase->cierre ? $fase->cierre->usuario_evaluador_id : null ,
                    'fase_id' => $fase->id,
                ];
                
                return $nuevo_cierre;
            })->groupBy('area');

            $cierresArea = [];
            foreach ($request->areas as $key) {
                $cierresArea[$key] = $cierresFiltrados[$key];
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
    public function showByEstado(string $estado)
    {
        try {
            $fases = Fase::all();
            if (EstadoFase::isEstadoCases($estado)) {
                $fases = Fase::where('estado', $estado)->get();
            }
            return response()->json([
                'message' => "Fases con estado: $estado, obtenidas exitosamente.",
                'data' => $fases,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $request->validate([
                'fases' => 'required',
                'fases.*.fase_id' => 'required|exists:fases,id',
                'fases.*.estado' => 'required',
            ]);
            $count_fases = [
                'fases_finalizadas' => 0,
                'fases_pendientes' => 0
            ];
            if ($request->has('fases')) {
                $fases = $request->fases;
                foreach ($fases as $fase) {
                    $cierre = VerificacionCierre::where('fase_id', $fase->fase_id);
                    $fase_actual = Fase::findOrFail($fase->fase_id);
                    $usuarios = [];
                    if (key_exists('usuario_encargado_id', $request->toArray())) {
                        $usuarios['usuario_encargado_id'] = Usuario::where('ci', $request->usuario_encargado_id)->get();
                    }
                    if (key_exists('usuario_evaluador_id', $request->toArray())) {
                        $usuarios['usuario_evaluador_id'] = Usuario::where('ci', $request->usuario_evaluador_id)->get();
                    }
                    if ($cierre) {
                        $cierre = $cierre->update($usuarios);
                        if (!empty($cierre['usuario_evaluador_id']) && !empty($cierre['usuario_evaluador_id'])) {
                            $fase_actual->update(['estado' => 'finalizada']);
                        }
                        $count_fases['fases_finalizadas'] = $count_fases['fases_finalizadas'] + 1;
                    } else {
                        $usuarios['fase_id'] = $fase->fase_id;
                        VerificacionCierre::create($usuarios);
                        $fase_actual->update(['estado' => 'pendiente']);
                        $count_fases['fases_pendientes'] = $count_fases['fases_pendientes'] + 1;
                    }
                }
                return response()->json([
                    'message' => "Verificacion de cierre de fases ejecutada con exito.",
                    'data' => $count_fases,
                ], 202);
            }
            return response()->json([
                'message' => "No se encontraron fases para actualizar.",
                'data' => [],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las fases.',
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
                    array_column($request->fases, 'id'));
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
