<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Olimpista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OlimpistasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $olimpistas = Olimpista::all();
            return response()->json([
                'data' => $olimpistas,
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        Log::info('POST request received in store method', $request->all());
        $request->validate([
            'nombres' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'codigo_sis' => 'required|integer',
        ]);

        try {
            $olimpista = Olimpista::where('codigo_sis', $request->codigo_sis)->first();
            if ($olimpista) {
                return response()->json([
                    'message' => "Olimpista $olimpista->codigo_sis ya existe.",
                    'data' => $olimpista,
                    'status' => 200,
                ]); 
            }
            $new_olimpista = Olimpista::create($request->all());
            if ($request->has('areas') and count($request->areas) > 0) {
                $areas = Area::whereIn('sigla', $request->areas)->with('fases')->get();
                $fases = $areas->map(function ($area) {
                    return $area->primeraFase()?->id;
                })->filter()->toArray();
                if (!empty($areas)) {
                    $new_olimpista->areas()->attach($areas->pluck('id')->toArray());
                }
                if (!empty($fases)) {
                    $new_olimpista->fases()->attach($fases, ['puntaje' => 0.00, 'comentarios' => '']);
                }
            }
            $new_olimpista = Olimpista::with('fases.area')->find($new_olimpista->id);
            return response()->json([
                'message' => "Olimpista creado exitosamente.",
                'data' => $new_olimpista,
                'status' => 201
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al crear olimpista',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($codsis)
    {
        try {
            $olimpista = Olimpista::all()->where('codigo_sis', $codsis)->first();
            if ($olimpista == null) {
                return response()->json([
                    'message' => "Olimpista $codsis No Encontrado.",
                    'status' => 400
                ]);
            }
            return response()->json([
                'message' => "Olimpista $codsis Encontrado.",
                'data' => $olimpista,
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showByArea(string $sigla='Ninguna')
    {
        try {
            if ($sigla == 'Ninguna') {
                return response()->json(
                    Area::with('olimpistas')->get());
            }
            return response()->json(
                Area::with('olimpistas')
                    ->where('sigla', $sigla)
                    ->get());
        } catch (\Throwable $th) {
            throw $th;
        }
    }


    public function showByFase(string $area='Ninguna', string $tipo_fase='Ninguna')
    {
        try {
            if ($tipo_fase == 'Ninguna') {
                $olimpistas_fase = Area::with('fases.olimpistas')
                    ->where('sigla', $area)
                    ->get();
                return response()->json([
                    'data'  => $olimpistas_fase,
                    'status' => 200
                ]);
            }
            $olimpistas_fase = Area::whereHas('fases', function ($query) use ($tipo_fase) {
                        $query->where('tipo_fase', $tipo_fase);
                    })
                    ->with('fases.olimpistas')
                    ->where('sigla', $area)
                    ->get();
            return response()->json([
                'message' => "Olimpistas de la fase $tipo_fase",
                'data'  => $olimpistas_fase,
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $codsis)
    {
        try {
            $nuevo_olimpista = Olimpista::where('codigo_sis', $codsis)->first();
            $datos_actualizar = $request->only($nuevo_olimpista->getFillable());
            foreach ($datos_actualizar as $campo => $valor) {
                if ($nuevo_olimpista->$campo != $valor) {
                    $hayCambios = true;
                    break;
                }
            }

            if ($hayCambios) {
                $nuevo_olimpista->update($datos_actualizar);
            }

            if ($nuevo_olimpista != null) {
                if ($request->has('areas') and count($request->areas) > 0) {
                    $areas = Area::whereIn('sigla', $request->areas)->with('fases')->get();
                    $fases = $areas->map(function ($area) {
                        return $area->primeraFase()?->id;
                    })->filter()->toArray();
                    if (!empty($areas)) {
                        $nuevo_olimpista->areas()->attach($areas->pluck('id')->toArray());
                    }
                    if (!empty($fases)) {
                        $nuevo_olimpista->fases()->attach($fases, ['puntaje' => 0.00, 'comentarios' => '']);
                    }
                }
                $nuevo_olimpista->update($datos_actualizar);
                
                return response()->json([
                    'message' => "Olimpista $codsis Actualizado.",
                    'data' => $nuevo_olimpista,
                    'status' => 202,
                ]);
            }
            return response()->json([
                'message' => "No se encontro al olimpista $codsis.",
                'status' => 200,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar olimpista',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $codsis)
    {
        try {
            $olimpista_eliminado = Olimpista::destroy($codsis);
            if ($olimpista_eliminado == 1) {
                return response()->json([
                    'message' => "Olimpista $codsis Eliminado.",
                    'status' => 200,
                ]);
            }
            return response()->json([
                'message' => "Olimpista $codsis No Eliminado.",
                'status' => 400,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
