<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Colegio;
use App\Models\Grado;
use App\Models\Grupo;
use App\Models\Olimpista;
use App\Models\Tutor;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

class GrupoController extends Controller
{
    public function indexGrupos()
    {
        try {
            $grupos = Grupo::with([
                'olimpistas',
                'colegio',
                'fases.area'
            ])->get();
            // $listaFiltrada = collect($grupos)->map(function ($grupo) {
            //     return collect($grupo->olimpistas)->map(function ($olimpista) use ($grupo) {
            //         return [
            //             'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
            //             'ci' => $olimpista->ci,
            //             'colegio' => $olimpista->colegio->nombre,
            //             'departamento' => $olimpista->colegio->departamento,
            //             'tutor' => $olimpista->tutor->nombre,
            //             'area' => $grupo->area->nombre,
            //             'grupo' => $grupo->sigla,
            //         ];
            //     });
            // });
            // $nuevaLista = [];
            // foreach ($listaFiltrada as $value) {
            //     $nuevaLista = array_merge($nuevaLista, $value->toArray());
            // }
            return response()->json([
                'message' => "Grupos obtenidos exitosamente.",
                'data' => $grupos,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los olimpistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'archivo' => 'required|file|mimes:xlsx,xls,csv',
            'nombre_grupo' => 'required|string',
            'colegio' => 'required',
            'colegio.nombre_colegio' => 'required|string',
            'colegio.direccion_colegio' => 'required|string',
            'colegio.telefono_colegio' => 'required|integer',
            'colegio.provincia_id' => 'required|string',
            'colegio.area' => 'required',
            'tutor_academico' => 'required',
            'tutor_academico.nombre_tutor_academico' => 'required|string',
            'tutor_academico.apellidos_tutor_academico' => 'required|string',
            'tutor_academico.celular_tutor_academico' => 'required|integer',
            'tutor_academico.email_tutor_academico' => 'required|string',
            'tutor_academico.ci_tutor_academico' => 'required|integer',
        ]);

        $grupoExistente = Grupo::where('nombre', $request->nombre_grupo)->get();
        if ($grupoExistente) {
            return response()->json([
                'message' => 'Ya existe un grupo con ese nombre.',
            ], 500);
        }

        $tutor = Tutor::where('ci', $request->tutor['ci_tutor'])->first();
        if (!$tutor) {
            $tutor = Tutor::create([
                'nombre' => $request->tutor['nombre_tutor'],
                'apellidos' => $request->tutor['apellidos_tutor'],
                'celular' => $request->tutor['celular_tutor'],
                'email' => $request->tutor['email_tutor'],
                'ci' => $request->tutor['ci_tutor']
            ]);
        }

        $nuevoGrupo = Grupo::create([
            'nombre' => $request->nombre_grupo,
            'tutor_id' => $tutor->id,
        ]);
        $path = $request->file('archivo')->getRealPath();
        $extension = $request->file('archivo')->getClientOriginalExtension();
        $datos = [];

        try {
            // Leer CSV
            if ($extension === 'csv') {
                if (($handle = fopen($path, 'r')) !== false) {
                    $header = null;
                    while (($row = fgetcsv($handle, 1000, ",")) !== false) {
                        if (!$header) {
                            $header = $row;
                            continue;
                        }
                        $datos[] = array_combine($header, $row);
                    }
                    fclose($handle);
                }
            } else {
                // Leer Excel
                $spreadsheet = IOFactory::load($path);
                $hoja = $spreadsheet->getActiveSheet();
                $header = [];
                foreach ($hoja->getRowIterator() as $index => $fila) {
                    $celdaIterator = $fila->getCellIterator();
                    $celdaIterator->setIterateOnlyExistingCells(false);
                    $filaDatos = [];
                    foreach ($celdaIterator as $celda) {
                        $filaDatos[] = $celda->getValue();
                    }

                    if ($index === 1) {
                        $header = $filaDatos;
                        continue;
                    }
                    $datos[] = array_combine($header, $filaDatos);
                }
            }

            $insertData = [];

            $colegio = Colegio::where('nombre', $request->colegio['nombre_colegio'])->first();
            $grado_id = Grado::where('nombre', $request->colegio['grado_escolar'])->get();
            if (!$colegio) {
                $colegio = Colegio::create([
                    'nombre' => $request->colegio['nombre_colegio'],
                    'direccion' => $request->colegio['direccion_colegio'],
                    'telefono' => $request->colegio['telefono_colegio'],
                    'provincia_id' => $request->colegio['provincia_id'],
                ]);
            }

            foreach ($datos as $dato) {

                if (empty($dato['nombres'] ?? null) || empty($dato['ci'] ?? null)) {
                    continue;
                }

                $olimpista = Olimpista::where('ci', $dato['ci'])->first();
                if (!$olimpista) {
                    $olimpista = Olimpista::create([
                        'nombres' => $dato['nombres'],
                        'apellido_paterno' => $dato['apellido_paterno'],
                        'apellido_materno' => $dato['apellido_materno'],
                        'ci' => $dato['ci'],
                        'email' => $dato['email'],
                        'celular' => $dato['celular'],
                        'grado_id' => $grado_id[0]->id,
                        'colegio_id' => $colegio->id,
                    ]);
                    $insertData[] = $olimpista;
                }

                $olimpista->tutores_academicos()->attach($tutor->id);

                $olimpista->grupos()->attach($nuevoGrupo->id);

                if (!empty($request->colegio['areas'] ?? null)) {
                    $areas = Area::whereIn('sigla', $dato['areas'])->with('fases')->get();
                    $fases = $areas->map(fn($area) => $area->primeraFase()?->id)->filter()->toArray();

                    if ($areas->isNotEmpty()) {
                        $olimpista->areas()->syncWithoutDetaching($areas->pluck('id')->toArray());
                    }
                    if (!empty($fases)) {
                        foreach ($fases as $faseId) {
                            $olimpista->fases()->syncWithoutDetaching([$faseId => ['puntaje' => 0.00, 'comentarios' => '']]);
                        }
                    }
                }
            }

            return response()->json([
                'message' => 'Olimpistas importados masivamente correctamente.',
                'total' => count($insertData),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al importar olimpistas masivo.',
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
