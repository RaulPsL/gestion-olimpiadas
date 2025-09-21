<?php

namespace App\Http\Controllers;

use App\Models\Fase;

class ClasificasionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $finalistas = Fase::with('area.olimpistas.calificaciones')->where('tipo_fase', 'finales')->get();
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
                'olimpistas' => function($query) {
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
