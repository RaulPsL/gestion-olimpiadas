<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Fase;
use App\Models\Nivel;
use App\Models\Rol;
use App\Models\Traits\Casts\TipoFase;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $fases = Fase::with([
                'area.usuarios.roles',
            ])->get();

            $usuariosFiltrados = $fases->flatMap(function ($fase) {
                return collect($fase->area->usuarios)->map(function ($usuario) use ($fase) {
                    if ($usuario->roles->first()) {
                        $rol = $usuario->roles->first();
                        return [
                            'ci' => $usuario->ci,
                            'nombre' => "$usuario->nombre $usuario->apellido",
                            'celular' => $usuario->celular,
                            'email' => $usuario->email,
                            'area' => $fase->area->sigla,
                            'fase' => $fase->sigla,
                            'nivel' => $fase->area->nivel,
                            'rol' => $rol->nombre,
                            'rol_sigla' => $rol->sigla,
                        ];
                    }
                })->filter();
            })->unique('ci')->values(); // Filtra por CI único

            return response()->json([
                'message' => "Usuarios obtenidos exitosamente.",
                'data' => $usuariosFiltrados->groupBy('rol'),
                'status' => 200
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrió un error en el servidor: $th.",
                'status' => 400
            ]);
        }
    }

    public function indexStaticData()
    {
        try {
            $areas = Area::with('niveles')->get()->map(function ($area, $index) {
                $niveles = $area->niveles->map(function ($nivel, $index) {
                    return [
                        'id' => $index + 1,
                        'value' => $nivel->id,
                        'label' => $nivel->nombre,
                    ];
                });
                return [
                    'id' => $index + 1,
                    'niveles' => $niveles,
                    'value' => $area->sigla,
                    'label' => $area->nombre,
                ];
            });
            return response()->json([
                'message' => "Usuarios obtenidos exitosamente.",
                'data' => [
                    'areas' => $areas,
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
            $usuario = Usuario::where('ci', $ci)->with(['areas', 'roles.menus.children', 'fases'])->first();
            if ($usuario) {
                return response()->json([
                    'message' => "Usuario obtenido exitosamente.",
                    'data' => $usuario,
                ], 200);
            }
            return  response()->json([
                'message' => "El usuario $ci no existe.",
            ], 400);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Ocurrio un error en el servidor: $th.",
            ], 500);
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
                if ($request->areas and count($request->areas) > 0) {
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
            Usuario::destroy('ci', $ci);
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

    public function register(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|string',
                'apellido' => 'required|string',
                'ci' => 'required|integer',
                'celular' => 'required|integer',
                'email' => 'required|string',
                'areas' => 'required',
                'rol' => 'required',
            ]);

            $usuario = Usuario::where('ci', $request->ci)->first();

            if ($usuario) {
                return response()->json([
                    'message' => "El usuarios con CI: $request->ci, ya existe.",
                    'data' => $usuario
                ], 200);
            }

            $caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';

            $password = '';
            $max = strlen($caracteres) - 1;

            // Generación criptográficamente segura
            for ($i = 0; $i < 16; $i++) {
                $index = random_int(0, $max);
                $password .= $caracteres[$index];
            }

            $usuario = Usuario::create([
                'ci' => $request->ci,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'celular' => $request->celular,
                'email' => $request->email,
                'nivel_id' => $request->nivel,
                'password' => '123456',
            ]);
            if ($request->has('areas') and count($request->areas) > 0) {
                $areas = Area::whereIn('sigla', $request->areas)->pluck('id')->toArray();
                if (!empty($areas)) {
                    $usuario->areas()->attach($areas);
                }
                if (!empty($nivel)) {

                    $fases = Fase::whereHas('area', function ($query) use ($request) {
                        $query->whereIn('sigla', $request->areas);
                    })->whereHas('nivel', function ($query) use ($request) {
                        $query->where('id', $request->nivel);
                    });

                    if (!empty($fases)) {
                        $usuario->fases()->attach($fases->pluck('id')->toArray());
                    }
                }
            }
            if ($request->has('rol') and count($request->rol) > 0) {
                $roles = Rol::where('sigla', $request->rol)->pluck('id')->toArray();
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

    public function login(Request $request)
    {
        try {
            if (!Auth::attempt($request->only(['ci', 'password']))) {
                return response()->json([
                    'message' => 'Credenciales de usuario invalidas.'
                ], 401);
            }

            $usuario = Auth::user();
            $token = $usuario->createToken('auth_token')->plainTextToken;

            $user_menu = Usuario::where('ci', $usuario->ci)
                ->with(['areas', 'roles.menus.children'])
                ->first();
            $areas = collect($user_menu->areas)->map(function ($area) {
                return [
                    'sigla' => $area->sigla,
                    'nombre' => $area->nombre,
                    'nivel' => $area->nivel,
                ];
            });

            $rol = collect($user_menu->roles)->map(function ($rol) {
                return [
                    'nombre' =>  $rol->nombre,
                    'sigla' => $rol->sigla,
                ];
            })->first();

            $menu = collect($user_menu->roles->first()->menus)->map(function ($menu) {
                $menu_sup = [
                    'title' => $menu->title,
                    'url' => $menu->url,
                    'icon' => $menu->icon,
                ];
                if (collect($menu->children)->count() > 0) {
                    $menu_sup = [
                        'title' => $menu->title,
                        'icon' => $menu->icon,
                    ];
                    $menu_sup['submenu'] = $menu->children;
                }
                return $menu_sup;
            });

            return response()->json([
                'user' => [
                    'data' => $usuario,
                    'rol' => $rol,
                    'areas' => $areas,
                    'menu' => $menu,
                ],
                'token' => $token,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Error interno del servidor: " . $th->getMessage(),
            ], 500);
        }
    }
}
