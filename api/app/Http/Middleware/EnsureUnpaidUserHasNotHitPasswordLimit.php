<?php

namespace App\Http\Middleware;

use App\Http\Enums\UserRoleEnum;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUnpaidUserHasNotHitPasswordLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->role !== UserRoleEnum::USER) {
            return $next($request);
        }

        if ($request->user()->passwordItems()->count() >= 50) {
            return new JsonResponse([
                'error' => 'This user has reached the 50 password limit. Please upgrade your account to store more passwords.'
            ], 402);
        }

        return $next($request);
    }
}
