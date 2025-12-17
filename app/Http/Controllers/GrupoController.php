<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Colegio;
use App\Models\Fase;
use App\Models\Grado;
use App\Models\Grupo;
use App\Models\Nivel;
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
        $dataReturn = [
            'olimpistas_registrados' => 0,
            'olimpistas_no_registrados' => [],
            'fases_no_existentes' => [],
        ];
        try {
            $request->validate([
                'archivo' => 'required|file|mimes:xlsx,xls,csv',
                'nombre_grupo' => 'required|string',
                'nivel' => 'required|integer',
                'colegio' => 'required',
                'colegio.nombre_colegio' => 'required|string',
                'colegio.telefono_colegio' => 'required|integer',
                'colegio.provincia_id' => 'required',
                'colegio.area' => 'required|string',
                'tutor' => 'required',
                'tutor.nombre_tutor' => 'required|string',
                'tutor.apellidos_tutor' => 'required|string',
                'tutor.celular_tutor' => 'required|integer',
                'tutor.email_tutor' => 'required|string',
                'tutor.ci_tutor' => 'required|integer',
            ]);

            $grupoExistente = Grupo::where('nombre', $request->nombre_grupo)->first();
            if ($grupoExistente) {
                return response()->json([
                    'message' => 'Ya existe un grupo con ese nombre.',
                ], 409);
            }

            $colegio = Colegio::where('nombre', $request->colegio['nombre_colegio'])->first();

            if (!$colegio) {
                $colegio = Colegio::create([
                    'nombre' => $request->colegio['nombre_colegio'],
                    'direccion' => $request->colegio['direccion_colegio'],
                    'telefono' => $request->colegio['telefono_colegio'],
                    'provincia_id' => $request->colegio['provincia_id'],
                ]);
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
                'colegio_id' => $colegio->id,
            ]);

            $path = $request->file('archivo')->getRealPath();
            $extension = $request->file('archivo')->getClientOriginalExtension();
            $datos = [];

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
            $fase = null;
            $nivel = null;
            $area = Area::with('niveles.grados')->where('sigla', $request->colegio['area'])->first();
            $nivel = Nivel::with('grados')->where('id', $request->nivel)->first();
            $grados = $nivel->grados->map(function ($grado) {
                return $grado->nombre;
            })->toArray();

            foreach ($datos as $dato) {

                if (empty($dato['nombres'] ?? null) || empty($dato['ci'] ?? null)) {
                    continue;
                }
                $olimpista = Olimpista::where('ci', $dato['ci'])->first();
                $grado = Grado::where('nombre', $dato['grado_escolar'])->first();

                if (!$grado) {
                    continue;
                }

                if ($area) {
                    if ($nivel) {
                        $fase = Fase::with('nivel')
                            ->where('area_id', $area->id)
                            ->where('nivel_id', $nivel->id)
                            ->where('tipo_fase', 'preliminares')
                            ->first();
                        if (!$fase) {
                            $dataReturn['fases_no_existentes'][] = $nivel->nombre;
                        }
                    }
                }

                if ($grado && !in_array($grado->nombre, $grados)) {
                    $nombre = $dato['nombres'] . " " . $dato['apellido_paterno'] . " " . $dato['apellido_materno'];
                    $dataReturn['olimpistas_no_registrados'][] = [
                        'nombres' => $nombre,
                        'ci' => $dato['ci'],
                        'grado' => $dato['grado_escolar'],
                        'motivo' => "El grado escolar del olimista no esta disponible para esta área."
                    ];
                    continue;
                }

                if (!$olimpista) {
                    $olimpista = Olimpista::create([
                        'nombres' => $dato['nombres'],
                        'apellido_paterno' => $dato['apellido_paterno'],
                        'apellido_materno' => $dato['apellido_materno'],
                        'ci' => $dato['ci'],
                        'email' => $dato['email'],
                        'celular' => $dato['celular'],
                        'fecha_nacimiento' => date('Y-m-d', strtotime($dato['fecha_nacimiento'])),
                        'grado_id' => $grado->id,
                        'colegio_id' => $colegio->id,
                    ]);
                    $insertData[] = $olimpista;
                } else {
                    $nombre = $dato['nombres'] . " " . $dato['apellido_paterno'] . " " . $dato['apellido_materno'];
                    $dataReturn['olimpistas_no_registrados'][] = [
                        'nombres' => $nombre,
                        'ci' => $dato['ci'],
                        'grado' => $dato['grado_escolar'],
                        'motivo' => "Ya existe el olimpista."
                    ];
                }
                $olimpista->grupos()->attach($nuevoGrupo->id);

                $olimpista->tutores()->syncWithoutDetaching([$tutor->id]);

                if ($area) {
                    $olimpista->areas()->syncWithoutDetaching([$area->id]);
                }
                if (!empty($fase)) {
                    $olimpista->fases()->syncWithoutDetaching([$fase->id => ['puntaje' => 0.00, 'comentarios' => '']]);
                }
            }

            $dataReturn['olimpistas_registrados'] = count($insertData);
            return response()->json([
                'message' => 'Olimpistas importados masivamente correctamente.',
                'data' => $dataReturn,
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
