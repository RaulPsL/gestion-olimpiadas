<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Olimpista;
use Illuminate\Http\Request;

class OlimpistasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $olimpistas = Olimpista::all();
        return response()->json($olimpistas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store()
    {
        //
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
            $validate_request = $request->validate([
                'codsis' => 'required',
                'nombres' => 'required',
                'apellidos' => 'required',
                'area' => 'required',
                'fase' => 'required',
            ]);
            $nuevo_olimpista = Olimpista::findOrFail($codsis);
            $nuevo_olimpista->update($request->all());
            return response()->json([
                'message' => "Olimpista $codsis Actualizado.",
                'data' => $nuevo_olimpista,
                'status' => 200,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
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
