<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminPanelMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        $yourToken = request()->bearerToken();
        // Fetch the associated token Model
        $token = \Laravel\Sanctum\PersonalAccessToken::findToken($yourToken);

        // Get the assigned user
        $user = $token->tokenable;
        $role = $user->role;
        if($role === 'user'){
            return $next($request);
        }
        return $next('Access denied!');
    }
}
