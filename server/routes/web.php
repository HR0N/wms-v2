<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VerifyEmailController;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/contact', [VerifyEmailController::class, 'contact']);
//Route::get('/', function (){return view('welcome');});
Route::get('/', function (){return redirect(env('FRONT_URL'));});
//Route::get('/home', function (){return view('home');});
Route::get('/home', [Controller::class, 'redirect_post']);




Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
    return $request->user();
});

// Verify email
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

// Resend link to verify email
Route::post('/email/verify/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');

Auth::routes(['verify' => true]);
