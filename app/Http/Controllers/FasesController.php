<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Fase;
use App\Models\Olimpista;
use App\Models\Traits\Casts\EstadoFase;
use Illuminate\Http\Request;

class FasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
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
            return response()->json([
                'message' => "Fases obtenidas exitosamente.",
                'data' => $fasesFiltradas,
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
                'fases.*.id' => 'required|exists:fases,id',
                'fases.*.estado' => 'required|in:' . implode(',', array_keys(EstadoFase::cases())),
            ]);
            if ($request->has('fases')) {
                $fases = $request->fases;
                foreach ($fases as $value) {
                    Fase::where('estado', $value['id'])->update($value);
                }
                return response()->json([
                    'message' => "Fases actualizadas exitosamente.",
                    'data' => Fase::whereIn('id', array_column($fases, 'id'))->get(),
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
