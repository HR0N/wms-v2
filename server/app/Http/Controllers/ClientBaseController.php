<?php

namespace App\Http\Controllers;

use App\Models\ClientBase;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use function Ramsey\Uuid\Lazy\toString;

class ClientBaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $yourToken = request()->bearerToken();
        // Fetch the associated token Model
        $token = PersonalAccessToken::findToken($yourToken);

        // Get the assigned user
        $user = $token->tokenable;
        return ClientBase::where('user', 'like', '%'.$user->id.'%')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $fields = $request->validate([
            'phone' => 'required|string|unique:client_base',
        ]);

        $yourToken = request()->bearerToken();
        // Fetch the associated token Model
        $token = \Laravel\Sanctum\PersonalAccessToken::findToken($yourToken);

        // Get the assigned user
        $user = $token->tokenable;
        //
        $data = array_merge($request->all(), ['user' => $user->id]);
        return ClientBase::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return ClientBase::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $base = ClientBase::find($id);
        $base->update($request->all());
        return $base;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return ClientBase::destroy($id);
    }

    /**
     * Search for a name
     *
     * @param  string  $phone
     * @return \Illuminate\Http\Response
     */
    public function search($phone)
    {
        return ClientBase::where('phone', 'like', '%'.$phone.'%')->get();
    }
}
