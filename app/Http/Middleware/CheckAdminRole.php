<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;

class CheckAdminRole
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                throw ValidationException::withMessages([
                    'message' => 'Usuário não autenticado.',
                ]);
            }

            $role = $user->role;
            if (!$role || !in_array($role->slug, ['admin'])) {
                throw ValidationException::withMessages([
                    'message' => 'Você não tem permissão para adicionar produtos.',
                ]);
            }

            return $next($request);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            throw ValidationException::withMessages([
                'message' => 'Token inválido.',
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            throw ValidationException::withMessages([
                'message' => 'Token expirado.',
            ]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'message' => 'Erro de autenticação.',
            ]);
        }
    }
}
