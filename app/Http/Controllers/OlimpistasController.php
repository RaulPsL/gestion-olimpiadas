<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Colegio;
use App\Models\Fase;
use App\Models\Grupo;
use App\Models\Nivel;
use App\Models\Olimpista;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class OlimpistasController extends Controller
{
    /**
     * Obtiene la lista de olimpistas con sus respectivos areas, fases y tutores academicos.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // $olimpistas = Olimpista::with([
            //         'areas:id,nombre',
            //         'fases' => function ($query) {
            //             $query->select(['fases.sigla', 'calificacions.puntaje', 'calificacions.olimpista_id']);
            //         }])->get();
            // $listaFiltrada = collect($olimpistas)->map(function ($olimpista) {
            //     $fases = $olimpista->fases->map(function ($fase) {
            //         return [
            //             'sigla' => $fase->sigla,
            //             'puntaje' => $fase->pivot->puntaje,
            //         ];
            //     });
            //     return [
            //         'nombres' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
            //         'codigo_sis' => $olimpista->codigo_sis,
            //         'areas' => $olimpista->areas->pluck('nombre'),
            //         'fases' => $fases,
            //     ];
            // });
            $fases = Fase::select(['id', 'sigla', 'area_id', 'nivel_id'])
                ->with([
                    'olimpistas.tutores',
                    'olimpistas.colegio.provincia.departamento',
                    'nivel',
                    'area:id,nombre'])->get();
            $listaFiltrada = collect($fases)->map(function ($fase) {
                return collect($fase->olimpistas)->map(function ($olimpista) use ($fase) {
                    $tutor = $olimpista->tutores->map(function ($tutor) { return "$tutor->nombre $tutor->apellidos";});
                    return [
                        'nombre' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                        'ci' => $olimpista->ci,
                        'colegio' => $olimpista->colegio->nombre,
                        'departamento' => $olimpista->colegio->provincia->departamento->nombre,
                        'provincia' => $olimpista->colegio->provincia->nombre,
                        'tutor' => $tutor->join(','),
                        'area' => $fase->area->nombre,
                        'fase' => $fase->sigla,
                        'nivel' => $fase->nivel->nombre,
                    ];
                });
            });
            $nuevaLista = [];
            foreach ($listaFiltrada as $value) {
                $nuevaLista = array_merge($nuevaLista, $value->toArray());
            }
            return response()->json([
                'message' => "Olimpistas obtenidos exitosamente.",
                'data' => collect($nuevaLista)->groupBy('area'),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los olimpistas.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function indexGrupos()
    {
        try {
            $grupos = Grupo::with([
                    'olimpistas',
                    'colegio',
                    'fases.area'])->get();
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

    /**
     * Obtiene la lista de areas, departamentos, grados y niveles que se utilizan en el sistema de olimpistas.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexStaticData()
    {
        try {
            $areas = Area::all(['sigla', 'nombre'])->map(function ($area, $index) {
                return [
                    'id' => $index+1,
                    'value' => $area->sigla,
                    'label' => $area->nombre,
                ];
            });
            $departamentos = DB::table('departamentos')->map(function ($departamento, $index) {
                return [
                    'id' => $index+1,
                    'value' => $departamento->id,
                    'label' => $departamento->nombre,
                ];
            });
            $provincias = DB::table('provincias')->map(function ($provincia, $index) {
                return [
                    'id' => $index+1,
                    'departamento_id' => $provincia->departamento_id,
                    'value' => $provincia->id,
                    'label' => $provincia->nombre,
                ];
            });

            $grados = DB::table('grados')->get()->map(function ($grado, $index) {
                return [
                    'id' => $index+1,
                    'nivel_id' => $grado->nivel_id,
                    'value' => $grado->id,
                    'label' => $grado->nombre,
                ];
            });
            $niveles = DB::table('nivels')->get()->map(function ($area, $index) {
                return [
                    'id' => $index+1,
                    'value' => $area->id,
                    'label' => $area->nombre,
                ];
            });
            return response()->json([
                'data' => [
                    'areas' => $areas,
                    'departamentos' => $departamentos,
                    'provincias' => $provincias,
                    'grados' => $grados,
                    'niveles' => $niveles,
                ],
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los datos estaticos de los olimpistas.',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombres' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'ci' => 'required|integer',
            'celular' => 'required|integer',
            'grado_escolar' => 'required|string',
            'nivel_competencia' => 'required|string',
            'tutor' => 'required',
            'tutor.nombre_tutor' => 'required|string',
            'tutor.referencia_tutor' => 'required|integer',
            'colegio' => 'required',
            'colegio.nombre_colegio' => 'required|string',
            'colegio.direccion_colegio' => 'required|string',
            'colegio.telefono_colegio' => 'required|integer',
            'colegio.departamento_colegio' => 'required|string',
        ]);

        try {
            $olimpista = Olimpista::where('ci', $request->ci)->first();
            if ($olimpista) {
                return response()->json([
                    'message' => "Olimpista $olimpista->ci ya existe.",
                    'data' => $olimpista,
                    'status' => 200,
                ]); 
            }

            $colegio = Colegio::where('nombre', $request->colegio['nombre_colegio'])->first();
            if (!$colegio) {
                $colegio = Colegio::create([
                    'nombre' => $request->colegio['nombre_colegio'],
                    'direccion' => $request->colegio['direccion_colegio'],
                    'telefono' => $request->colegio['telefono_colegio'],
                    'departamento' => $request->colegio['departamento_colegio'],]);
            }

            $new_olimpista = Olimpista::create([
                'nombres' => $request->nombres,
                'apellido_paterno' => $request->apellido_paterno,
                'apellido_materno' => $request->apellido_materno,
                'ci' => $request->ci,
                'email' => $request->email,
                'celular' => $request->celular,
                'grado_id' => $request->grado_id,
                'colegio_id' => $colegio->id,
            ]);

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

            if ($request->has('tutor')) {
                $tutor = Tutor::where('ci', $request->tutor['ci_tutor'])->first();
                if (!$tutor) {
                    $tutor = Tutor::create([
                        'nombre' => $request->tutor['nombre'],
                        'apellidos' => $request->tutor['apellidos'],
                        'celular' => $request->tutor['celular'],
                        'email' => $request->tutor['email'],
                        'ci' => $request->tutor['ci']]);
                }
                $new_olimpista->tutores_academicos()->attach($tutor->id);
            }

            $new_olimpista = Olimpista::with([
                'fases.area',
                'tutores_academicos',
                'tutor',
                'colegio',
                ])->find($new_olimpista->id);

            return response()->json([
                'message' => "Olimpista creado exitosamente.",
                'data' => $new_olimpista,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al crear olimpista.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function storeByFile(Request $request)
    {
        $request->validate([
            'archivo' => 'required|file|mimes:xlsx,xls,csv',
            'colegio' => 'required',
            'colegio.nombre_colegio' => 'required|string',
            'colegio.direccion_colegio' => 'required|string',
            'colegio.telefono_colegio' => 'required|integer',
            'colegio.departamento_colegio' => 'required|string',
            'tutor_academico' => 'required',
            'tutor_academico.nombre_tutor_academico' => 'required|string',
            'tutor_academico.apellidos_tutor_academico' => 'required|string',
            'tutor_academico.celular_tutor_academico' => 'required|integer',
            'tutor_academico.email_tutor_academico' => 'required|string',
            'tutor_academico.ci_tutor_academico' => 'required|integer',
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
                        if (!$header) { $header = $row; continue; }
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
                    foreach ($celdaIterator as $celda) { $filaDatos[] = $celda->getValue(); }

                    if ($index === 1) { $header = $filaDatos; continue; }
                    $datos[] = array_combine($header, $filaDatos);
                }
            }

            $insertData = [];
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

            $colegio = Colegio::where('nombre', $request->colegio['nombre_colegio'])->first();
            if (!$colegio) {
                $colegio = Colegio::create([
                    'nombre' => $request->colegio['nombre_colegio'],
                    'direccion' => $request->colegio['direccion_colegio'],
                    'telefono' => $request->colegio['telefono_colegio'],
                    'departamento' => $request->colegio['departamento_colegio'],]);
            }

            foreach ($datos as $dato) {
                
                if (empty($dato['nombres'] ?? null) || empty($dato['ci'] ?? null)) {
                    continue;
                }

                $otroTutor = null;
                if (empty($dato['nombres_tutor'] ?? null) || empty($dato['ci_tutor'] ?? null)) {
                    $otroTutor = Tutor::where('ci', $dato['ci_tutor'])->first();
                    if (!$otroTutor) {
                        $otroTutor = Tutor::create([
                            'nombre' => $dato['nombre_tutor'],
                            'apellidos' => $dato['apellidos_tutor'],
                            'celular' => $dato['celular_tutor'],
                            'email' => $dato['email_tutor'],
                            'ci' => $dato['ci_tutor']
                        ]);
                    }
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
                        'grado_id' => $dato['grado_escolar'],
                        'colegio_id' => $colegio->id,
                    ]);
                    $insertData[] = $olimpista;
                }

                $olimpista->tutores_academicos()->attach($tutor->id);

                if ($otroTutor) $olimpista->tutores_academicos()->attach($otroTutor->id);

                if (!empty($dato['areas'] ?? null)) {
                    $areas = Area::whereIn('sigla', explode(',', $dato['areas']))->with('fases')->get();
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
            Log::error('Error al importar olimpistas masivo: ' . $th->getMessage());
            return response()->json([
                'message' => 'Error al importar olimpistas masivo.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function show($ci)
    {
        try {
            $olimpista = Olimpista::with([
                'tutor:id,nombre',
                'colegio:id,nombre',
                'tutores_academicos:id,nombre,apellidos',
                'areas:id,nombre',
                'fases:id,sigla'
            ])->where('ci', $ci)->first();
            if ($olimpista == null) {
                return response()->json([
                    'message' => "Olimpista $ci No Encontrado.",
                    'status' => 400
                ]);
            }
            return response()->json([
                'message' => "Olimpista $ci Encontrado.",
                'data' => $olimpista,
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener al olimpista',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Muestra los olimpistas de una area determinada.
     *
     * @param string $sigla Sigla de la area a la que se refiere (default: 'Ninguna')
     *
     * @return \Illuminate\Http\JsonResponse
     */
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
            return response()->json([
                'message' => 'Error al obtener a los olimpistas.',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Muestra los olimpistas de una fase determinada en una area determinada.
     *
     * @param string $area Sigla de la area a la que se refiere (default: 'Ninguna')
     * @param string $tipo_fase Tipo de fase a la que se refiere (default: 'Ninguna')
     *
     * @return \Illuminate\Http\JsonResponse
     */
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
            return response()->json([
                'message' => 'Error al obtener a los olimpistas.',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Actualiza un olimpista existente.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $codsis
     * @return \Illuminate\Http\Response
     *
     * @throws \Throwable
     */
    public function update(Request $request, int $ci)
    {
        try {
            $nuevo_olimpista = Olimpista::where('ci', $ci)->first();
            if ($nuevo_olimpista != null) {
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
                    'message' => "Olimpista $ci Actualizado.",
                    'data' => $nuevo_olimpista,
                    'status' => 202,
                ]);
            }
            
            return response()->json([
                'message' => "No se encontro al olimpista $ci.",
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
     * Elimina al olimpista con el codigo sis especificado
     * 
     * @param int $codsis Codigo sis del olimpista a eliminar
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
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
            return response()->json([
                'message' => 'Error al eliminar al olimpista.',
                'error' => $th->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
