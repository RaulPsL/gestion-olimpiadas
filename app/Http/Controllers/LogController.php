<?php

namespace App\Http\Controllers;

use App\Models\Log;
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
                    "nota" => $calificacion->calificacion->nota,
                ];
            })->groupBy('area');
            $logsPorArea = [];
            foreach ($request->areas as $key) {
                $logsPorArea["$key"] = $logCalificaciones["$key"];
            }
            return response()->json([
                'data' => $logsPorArea,
                'message' => 'Calificaciones obtenidas con exito.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error al conseguir las calificaciones: ".$th->getMessage(),
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
                'message' => "Error al conseguir las calificaciones: ".$th->getMessage(),
            ], 500);
        }
    }
}
