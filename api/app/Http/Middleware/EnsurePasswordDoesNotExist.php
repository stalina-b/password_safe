<?php

namespace App\Http\Middleware;

use Closure;
use Domain\Password\PasswordIdentical;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Symfony\Component\HttpFoundation\Response;

class EnsurePasswordDoesNotExist
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->has('password') === false) {
            return $next($request);
        }

        $request->validate([
            'password' => Password::min(6)
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->letters()
                ->uncompromised(),
        ]);

        $masterPassword = base64_decode($request->input('master_password'));

        if (PasswordIdentical::is($request->input('password'), $masterPassword)) {
            return new JsonResponse([
                'error' => 'Given password already exists. For security reasons, please pick another.',
            ], 422);
        }

        return $next($request);
    }
}
