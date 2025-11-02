<?php

namespace App\Http\Controllers;

use App\Models\Fase;
use App\Models\Log;
use App\Models\Olimpista;
use App\Models\Usuario;
use App\Models\VerificacionCierre;
use Illuminate\Http\Request;

class LogController extends Controller
{
    
    public function logsCalificaciones(Request $request)
    {
        $request->validate([
            'areas' => 'required'
        ]);
        try {
            $calificaciones = Log::with(['usuario.roles', 'olimpista', 'calificacion.fase.area'])->get();
            $logCalificaciones = $calificaciones->map(function ($calificacion) {
                $usuario = $calificacion->usuario;
                $rol = $usuario->roles->first();
                $fase = $calificacion->calificacion->fase;
                return [
                    "usuario" => "$usuario->nombre $usuario->apellido",
                    "rol_usuario" => $rol->nombre,
                    "ci_olimpista" => $calificacion->olimpista->ci,
                    "fase" => $fase->sigla,
                    "area" => $fase->area->nombre,
                    "accion" => $calificacion->accion,
                    "fecha_creacion" => date('d/M/Y H:i', strtotime($calificacion->create_at)),
                    "fecha_modificacion" => date('d/M/Y H:i', strtotime($calificacion->update_at)),
                    "nota" => $calificacion->calificacion->puntaje,
                ];
            })->groupBy('area');
            $logsPorArea = [];
            foreach ($request->areas as $key) {
                if (key_exists($key, $logCalificaciones->toArray())) $logsPorArea["$key"] = $logCalificaciones["$key"];
            }
            return response()->json([
                'data' => $logsPorArea,
                'message' => 'Calificaciones obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir los logs de calificaciones: ".$th->getMessage(),
            ], 500);
        }
    }

    
    public function logCierreFases()
    {
        try {
            $fases = VerificacionCierre::with(['encargado', 'evaluador', 'fase.area'])->get();
            $log_fases = $fases->map(function ($fase) {
                $encargado = $fase->encargado;
                $nombre_encargado = "$encargado->nombre $encargado->apelido - $encargado->rol";
                $evaluador = $fase->evaluador;
                $nombre_evaluador = "$evaluador->nombre $evaluador->apelido - $evaluador->rol";
                return [
                    "encargado" => $nombre_encargado,
                    "evaluador" => $nombre_evaluador,
                    "fase" => $fase->sigla,
                    "estado_fase" => $fase->estado,
                    "area" => $fase->area->nombre,
                    "fecha_creacion" => $fase->create_at,
                    "fecha_modificacion" => $fase->update_at,
                    "fecha_fin_fase" => $fase->fase->fecha_fin,
                    "fecha_inicio_fase" => $fase->fase->feha_inicio,
                    "fecha_calificacion_fase" => $fase->fase->fecha_calificacion,
                ];
            });
            return response()->json([
                'data' => $log_fases,
                'message' => 'Log de fases obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir los log de fases: ".$th->getMessage(),
            ], 500);
        }
    }

    public function statistics() {
        try {
            $olimpistas = Olimpista::all();
            $usuarios = Usuario::with(['roles'])->get()->map(function ($usuario) {
                $rol = $usuario->roles->first();
                return [
                    'nombre' => $usuario->nombre,
                    'apellido' => $usuario->apellido,
                    'email' => $usuario->email,
                    'celular' => $usuario->celular,
                    'ci' => $usuario->ci,
                    'rol' => $rol?->nombre,
                ];
            });
            $olimpistasByEstado = $olimpistas->groupBy('estado');
            $usuariosByRol = $usuarios->groupBy('rol');
            $datosEstadisticos = [
                'totalOlimpistas' => $olimpistas->count(),
                'clasificados' => 0,
                'desclasificados' => 0,
                'no clasificados' => 0,
                'totalUsuarios' => $usuarios->count(),
                'encargados' => collect($usuariosByRol['Encargado de Área'])->count(),
                'evaluadores' => collect($usuariosByRol['Evaluador'])->count(),
            ];
            if (key_exists('clasificado', $olimpistasByEstado->toArray())) {
                $datosEstadisticos['clasificados'] = $olimpistasByEstado['clasificado']->count();
            }
            if (key_exists('no clasificado', $olimpistasByEstado->toArray())) {
                $datosEstadisticos['desclasificados'] = $olimpistasByEstado['desclasificado']->count();
            }
            if (key_exists('desclasificado', $olimpistasByEstado->toArray())) {
                $datosEstadisticos['no clasificados'] = $olimpistasByEstado['no clasificado']->count();
            }
            return response()->json([
                'data' => $datosEstadisticos,
                'message' => 'Log de fases obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir las calificaciones: ".$th->getMessage(),
            ], 500);
        }
    }

    public function olimpistas() {
        try {
            $olimpistas = Fase::with([
                'olimpistas.colegio.provincia.departamento',
                'olimpistas.tutores',
                'area.usuarios.roles'
            ])->get()->flatMap(function ($fase) {
                $area = $fase->area;
                return collect($fase->olimpistas)->map(function ($olimpista) use ($area, $fase) {
                    $tutor_academico = $olimpista->tutores->first();
                    $encargado = $area->usuarios->first();
                    $nombreTutor = !empty($tutor_academico) ? "$tutor_academico->nombre $tutor_academico->apellidos" : "";
                    $nombreEncargado = "$encargado->nombre $encargado->apellido";
                    return [
                        'nombreParticipante' => "$olimpista->nombres",
                        'apellidoParticipante' => "$olimpista->apellido_paterno $olimpista->apellido_materno",
                        'estado' => $olimpista->estado,
                        'nivel' => $fase->nivel,
                        'nota' => $olimpista->pivot->puntaje,
                        'area' => $area->nombre,
                        'nombreTutor' => $nombreTutor,
                        'nombreEncargado' => $nombreEncargado,
                        'colegio' => $olimpista->colegio->nombre,
                        'departamento' => $olimpista->colegio->provincia->departamento->nombre,
                        'provincia' => $olimpista->colegio->provincia->nombre,
                    ];
                });
            })->sortByDesc('nota');
            
            $olimpistas = $olimpistas->map(function ($olimpista, $index) {
                $olimpista['puesto'] = $index + 1;
                return $olimpista;
            })->groupBy('estado');

            $usuarios = Usuario::with(['roles'])->get()->map(function ($usuario) {
                $rol = $usuario->roles->first();
                return [
                    'nombre' => $usuario->nombre,
                    'apellido' => $usuario->apellido,
                    'email' => $usuario->email,
                    'celular' => $usuario->celular,
                    'ci' => $usuario->ci,
                    'rol' => $rol?->nombre,
                ];
            })->groupBy('rol');

            return response()->json([
                'data' => [
                    'olimpistas' => $olimpistas,
                    'usuarios' => [
                        'encargados' => $usuarios['Encargado de Área'],
                        'evaluadores' => $usuarios['Evaluador'],
                    ],
                ],
                'message' => 'Log de fases obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir las calificaciones: ".$th->getMessage(),
            ], 500);
        }
    }
}
