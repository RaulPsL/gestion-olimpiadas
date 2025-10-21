<?php

namespace App\Http\Controllers;

use App\Models\Fase;
use App\Models\Log;
use App\Models\Olimpista;
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
                    "sup_usuario_and_rol" => $nombre_encargado,
                    "sub_usuario_and_rol" => $nombre_evaluador,
                    "fase" => $fase->sigla,
                    "estado_fase" => $fase->estado,
                    "area" => $fase->area->nombre,
                    "fecha_creacion" => $fase->create_at,
                    "fecha_modificacion" => $fase->update_at,
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
            $olimpistasByEstado = $olimpistas->groupBy('estado');
            return response()->json([
                'data' => [
                    'total' => $olimpistas->count(),
                    'clasificados' => $olimpistasByEstado['clasificado']->count(),
                    'desclasificados' => $olimpistasByEstado['desclasificado']->count(),
                    'no clasificados' => $olimpistasByEstado['no clasificado']->count(),
                ],
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
            $fases = Fase::with([
                'olimpistas.colegio',
                'olimpistas.tutores_academicos',
                'area.usuarios.roles'
            ])->get();
            $olimpistas = collect($fases)->flatMap(function ($fase) {
                $area = $fase->area;
                return collect($fase->olimpistas)->map(function ($olimpista) use ($area) {
                    $tutor_academico = $olimpista->tutores_academicos->first();
                    $encargado = $area->usuarios->first();
                    $nombreTutor = !empty($tutor_academico) ? "$tutor_academico->nombre $tutor_academico->apellidos" : "";
                    $nombreEncargado = "$encargado->nombre $encargado->apellido";
                    return [
                        'nombreParticipante' => "$olimpista->nombres $olimpista->apellido_paterno $olimpista->apellido_materno",
                        'estado' => $olimpista->estado,
                        'nivel' => $area->nivel,
                        'nota' => $olimpista->pivot->puntaje,
                        'nombreTutor' => $nombreTutor,
                        'nombreEncargado' => $nombreEncargado,
                        'colegio' => $olimpista->colegio->nombre,
                        'departamento' => $olimpista->colegio->departamento,
                    ];
                });
            })->sortByDesc('nota');
            
            $olimpistas = $olimpistas->map(function ($olimpista, $index) {
                $olimpista['puesto'] = $index + 1;
                return $olimpista;
            })->groupBy('estado');

            return response()->json([
                'data' => $olimpistas,
                'message' => 'Log de fases obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir las calificaciones: ".$th->getMessage(),
            ], 500);
        }
    }
}
