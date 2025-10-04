<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Calificacion;
use App\Models\Fase;
use App\Models\Olimpista;
use Illuminate\Http\Request;

class CalificacionesController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function calificacionesOlimpistas(Request $request)
    {
        try {
            $request->validate([
                'areas' => 'required',
            ]);
            $fases = Fase::select(['id', 'area_id', 'sigla'])
                ->with([
                    'olimpistas.tutor',
                    'olimpistas.tutores_academicos',
                    'olimpistas.colegio',
                    'area:id,nombre,sigla',
                ])->get();
            $listaFiltrada = collect($fases)->map(function ($fase) {
                return collect($fase->olimpistas)->map(function ($olimpista) use ($fase) {
                    return [
                        'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                        'estado' => $olimpista->estado,
                        'colegio' => $olimpista->colegio->nombre,
                        'departamento' => $olimpista->colegio->departamento,
                        'area' => $fase->area->nombre,
                        'fase' => $fase->sigla,
                        'sigla_area' => $fase->area->sigla,
                        'nivel' => $olimpista->nivel_escolar,
                        'nota_olimpista_id' => $olimpista->pivot->olimpista_id,
                        'nota_fase_id' => $olimpista->pivot->fase_id,
                        'nota' => $olimpista->pivot->puntaje,
                        'comentarios' => $olimpista->pivot->comentarios,
                    ];
                });
            });
            $nuevaLista = [];
            foreach ($listaFiltrada as $value) {
                $nuevaLista = array_merge($nuevaLista, $value->toArray());
            }

            $grupoPorArea = collect($nuevaLista)->map( function ($item) use ($request) {
                if (in_array($item['sigla_area'], $request->areas)) {
                    return $item;
                }
            })->sortByDesc('nota')->filter()->groupBy('area');
            return response()->json([
                'message' => "Calificaciones de los olimpistas obtenidos exitosamente.",
                'data' => $grupoPorArea,
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
                'notas' => 'required',
                'notas.*.nota_olimpista_id' => 'required|integer',
                'notas.*.nota_fase_id' => 'required|integer',
                'notas.*.estado_olimpista' => 'required|boolean',
                'notas.*.nota' => 'required',
                'notas.*.comentarios' => 'required|string',
            ]);

            $cantidad_modificada = 0;
            foreach ($request->notas as $nota) {
                $calificacion = Calificacion::where('olimpista_id', $nota['nota_olimpista_id'])
                    ->where('fase_id', $nota['nota_fase_id'])
                    ->first();
                if (!$nota->estado_olimpista) {
                    $olimpista = Olimpista::findOrFail($nota['nota_olimpista_id']);
                    $olimpista->update([
                        'estado' => 'desclasificado'
                    ]);
                }
                if (!$calificacion) continue;
                $calificacion->update([
                        'puntaje' => $nota['nota'],
                        'comentarios' => $nota['comentarios'],
                    ]);
                $cantidad_modificada++;
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
