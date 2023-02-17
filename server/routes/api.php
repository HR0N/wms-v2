<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientBaseCategoriesController;
use App\Http\Controllers\ClientBaseController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|   http://127.0.0.1:8000/api/test
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/mail', [VerifyEmailController::class, 'contact']);



//Route::get('/get_client_base_categories', [ClientBaseCategoriesController::class, 'index']);
//Route::group(['middleware' => 'auth:sanctum', 'middleware' => 'admin'], function (){


Route::group(['middleware' => 'auth:sanctum', 'middleware' => 'user'], function (){

    Route::get('/get_contact_cards', [ClientBaseController::class, 'index']);
    Route::post('/create_contact_card', [ClientBaseController::class, 'store']);
    Route::get('/get_contact_card/{id}', [ClientBaseController::class, 'show']);
    Route::post('/update_contact_card/{id}', [ClientBaseController::class, 'update']);
    Route::get('/destroy_contact_card/{id}', [ClientBaseController::class, 'destroy']);
    Route::get('/search_contact_card/{phone}', [ClientBaseController::class, 'search']);

    Route::get('/get_client_base_categories', [ClientBaseCategoriesController::class, 'index']);
    Route::post('/create_client_base_category', [ClientBaseCategoriesController::class, 'store']);
    Route::get('/delete_client_base_category/{id}', [ClientBaseCategoriesController::class, 'destroy']);

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
