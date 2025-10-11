<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado para esta accion.'], 401);
        }
        
        if (!$user->hasAnyRol($roles)) {
            return response()->json(['error' => 'Usuario no autorizado para esta accion.'], 403);
        }

        return $next($request);
    }
}
