<?php

namespace App\Http\Controllers;

use App\Models\Calificacion;
use App\Models\Fase;
use App\Models\Log;
use App\Models\Olimpista;
use App\Models\Usuario;
use Illuminate\Http\Request;

class CalificacionesController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function olimpistas(Request $request)
    {
        try {
            $request->validate([
                'areas' => 'required',
            ]);
            $fases = Fase::select(['id', 'area_id', 'sigla', 'fecha_fin', 'estado'])
                ->whereIn('estado', ['en curso', 'pendiente'])
                ->with([
                    'olimpistas.colegio.provincia.departamento',
                    'area',
                    'cierre',
                ])
                ->whereHas('area', function ($query) use ($request){
                    $query->whereIn('nombre', $request->areas);
                })
                ->get();
            $listaFinal = [];
            foreach (collect($fases) as $fase) {
                $area = $fase->area->nombre;
                $es_avalado = $fase->cierre && ($fase->cierre->usuario_encargado_id && $fase->cierre->usuario_evaluador_id);
                $calificaciones = collect($fase->olimpistas)->map(function ($olimpista) use ($fase) {
                    if ($olimpista->estado !== 'activo') {
                        return [
                        'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                        'estado' => $olimpista->estado,
                        'colegio' => $olimpista->colegio->nombre,
                        'departamento' => $olimpista->colegio->provincia->departamento->nombre,
                        'provincia' => $olimpista->colegio->provincia->nombre,
                        'area' => $fase->area->nombre,
                        'fase' => $fase->sigla,
                        'sigla_area' => $fase->area->sigla,
                        'nivel' => $olimpista->nivel_escolar,
                        'nota_olimpista_id' => $olimpista->pivot->olimpista_id,
                        'nota_fase_id' => $olimpista->pivot->fase_id,
                        'nota' => $olimpista->pivot->puntaje,
                        'comentarios' => $olimpista->pivot->comentarios,
                    ];
                    }
                });
                if ($calificaciones->count() > 0) {
                    $listaFinal["$area"] = [
                        'fecha_calificacion' => date('d/M/Y H:i', strtotime($fase->fecha_calificacion)),
                        'fecha_fin' => date('d/M/Y H:i', strtotime($fase->fecha_fin)),
                        'avalado' => $es_avalado,
                        'estad' => $fase->estado,
                        'calificaciones' => $calificaciones->sortByDesc('nota')->values()
                    ];
                }
            }
            return response()->json([
                'message' => "Calificaciones de los olimpistas obtenidos exitosamente.",
                'data' => $listaFinal,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener las calificaciones.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateOlimpistas(Request $request)
    {
        try {
            $request->validate([
                'usuario_ci' => 'required',
                'notas' => 'required',
                'notas.*.nota_olimpista_id' => 'required|integer',
                'notas.*.nota_fase_id' => 'required|integer',
                'notas.*.estado_olimpista' => 'required|string',
                'notas.*.nota' => 'required',
            ]);
            $user = Usuario::where('ci', $request->usuario_ci)->first()->id;
            $tabla = (new Calificacion())->getTable();
            $cantidad_modificada = 0;
            foreach ($request->notas as $nota) {
                $calificacion = Calificacion::where('olimpista_id', $nota['nota_olimpista_id'])
                    ->where('fase_id', $nota['nota_fase_id'])
                    ->first();

                $olimpista = Olimpista::findOrFail($nota['nota_olimpista_id']);
                $olimpista->update([
                    'estado' => $nota['estado_olimpista']
                ]);

                if ($calificacion && ($nota['nota'] != 0 || $nota['comentarios'] != '')) {
                    $calificacion->update([
                        'puntaje' => $nota['nota'],
                        'comentarios' => $nota['comentarios'] ? $nota['comentarios'] : "",
                    ]);
                    
                    Log::create([
                        'usuario_id' => $user,
                        'accion' => $request->method(),
                        'tabla' => $tabla,
                        'calificacion_id' => $calificacion->id,
                        'olimpista_id' => $nota['nota_olimpista_id'],
                    ]);
                    $cantidad_modificada++;
                }
            }
            return response()->json([
                'message' => "Calificaciones actualizadas exitosamente.",
                'data' => $cantidad_modificada,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar las calificaciones.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
