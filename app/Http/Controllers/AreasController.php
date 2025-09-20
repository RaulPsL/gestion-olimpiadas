<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Traits\Casts\EstadoFase;
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
            if ($request->has('fases')) {
                $request->validate([
                    'fases.*.sigla' => 'required|string',
                    'fases.*.tipo_fase' => 'required|in:' . implode(',', array_keys(EstadoFase::cases())),
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
                    'tipo_fase' => EstadoFase::Pendiente->value,
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
                'message' => 'Error al obtener las areas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
