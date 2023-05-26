<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class EnsureMasterPasswordIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->has('master_password') === false) {
            return $next($request);
        }

        $request->validate([
            'master_password' => 'min:1|max:255',
        ]);

        $masterPassword = base64_decode($request->input('master_password'));

        if (! Hash::check($masterPassword, $request->user()->password)) {
            return new JsonResponse([
                'error' => 'Master password does not match with user password.',
            ], 403);
        }

        return $next($request);
    }
}
