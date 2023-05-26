<?php

namespace App\Http\Middleware;

use App\Http\Enums\UserRoleEnum;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->role !== UserRoleEnum::ADMIN) {
            return new JsonResponse([
                'error' => 'User is not an administrator',
            ], 403);
        }

        return $next($request);
    }
}