<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $usuarios = Usuario::with(['roles', 'areas'])->get();
            return response()->json([
                'message' => "Usuarios obtenidos exitosamente.",
                'data' => $usuarios,
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'status' => 400
            ]);
        }
    }

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
            $roles = Rol::all(['nombre'])->map(function ($rol, $index) {
                $label_rol = substr($rol->nombre, 0, 1).strtolower(substr($rol->nombre, 1));
                return [
                    'id' => $index+1,
                    'value' => $rol->nombre,
                    'label' => $label_rol,
                ];
            });
            return response()->json([
                'message' => "Usuarios obtenidos exitosamente.",
                'data' => [
                    'areas' => $areas,
                    'roles' => $roles,
                ],
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'status' => 400
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $ci)
    {
        try {
            $usuario = Usuario::where('ci', $ci)->first();
            if ($usuario) {
                return response()->json([
                    'message' => "Usuario obtenido exitosamente.",
                    'data' => $usuario,
                    'status' => 200
                ]);
            }
            return  response()->json([
                'message' => "El usuario $ci no existe.",
                'status' => 401
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'status' => 500,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $ci)
    {
        try {
            $usuario = Usuario::where('ci', $ci)->first();
            if ($usuario) {
                if  ($request->areas and count($request->areas) > 0) {
                    $areas = Area::whereIn('sigla', $request->areas)->pluck('id')->toArray();
                    if (!empty($areas)) {
                        $usuario->areas()->attach($areas);
                    }
                }
                if ($request->roles and count($request->roles) > 0) {
                    $roles = Rol::whereIn('sigla', $request->roles)->pluck('id')->toArray();
                    if (!empty($roles)) {
                        $usuario->roles()->attach($roles);
                    }
                }
                $datos_actualizar = $request->only($usuario->getFillable());
                foreach ($datos_actualizar as $campo => $valor) {
                    if ($usuario->$campo != $valor) {
                        $hayCambios = true;
                        break;
                    }
                }

                if ($hayCambios) {
                    $usuario->update($datos_actualizar);
                }

                return response()->json([
                    'message' => "Usuario con CI: $ci, actualizado exitosamente.",
                    'data' => $usuario,
                ], 201);
            }
            return response()->json([
                'message' => "No se enccontro al usuarios con CI: $ci.",
                'data' => $usuario,
            ], 401);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'status' => 400,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $ci)
    {
        try {
            if (!Usuario::where('ci', $ci)->first()) {
                return response()->json([
                    'message' => "No se encontro al usuario con CI: $ci.",
                    'status' => 401
                ]);
            }
            $usuario = Usuario::destroy('ci', $ci);
            return response()->json([
                'message' => "Usuario eliminado exitosamente.",
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'status' => 400,
            ]);
        }
    }

    public function register(Request $request){
        try {
            $request->validate([
                'nombre' => 'required|string',
                'apellido' => 'required|string',
                'ci' => 'required|integer',
                'celular' => 'required|integer',
                'email' => 'required|string',
                'password' => 'required|string',
            ]);

            $usuario = Usuario::where('ci', $request->ci)->first();

            if ($usuario) {
                return response()->json([
                    'message' => "El usuarios con CI: $request->ci, ya existe.",
                    'data' => $usuario
                ], 200);
            }
            $usuario = Usuario::create([
                'ci' => $request->ci,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'celular' => $request->celular,
                'email' => $request->email,
                'password' => $request->password,
            ]);
            if ($request->has('areas') and count($request->areas) > 0) {
                $areas = Area::whereIn('sigla', $request->areas)->pluck('id')->toArray();
                if (!empty($areas)) {
                    $usuario->areas()->attach($areas);
                }
            }
            if ($request->has('roles') and count($request->roles) > 0) {
                $roles = Rol::whereIn('nombre', $request->roles)->pluck('id')->toArray();
                if (!empty($roles)) {
                    $usuario->roles()->attach($roles);
                }
            }
            return response()->json([
                'message' => "El usuario se creó con éxito.",
                'data' => $usuario,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
                'data' => [],
            ], 500);
        }
    }
}
