<?php

namespace App\Http\Controllers;

use App\Models\ClientBasesCategories;
use Illuminate\Http\Request;

class ClientBaseCategoriesController extends Controller
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
        $token = \Laravel\Sanctum\PersonalAccessToken::findToken($yourToken);

        // Get the assigned user
        $user = $token->tokenable;

//        return ClientBasesCategories::all();

        return ClientBasesCategories::where('user', 'like', '%'.$user->id.'%')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $fields = $request->validate([
            'category' => 'required|string|unique:client_bases_categories',
        ]);

        $yourToken = request()->bearerToken();
        // Fetch the associated token Model
        $token = \Laravel\Sanctum\PersonalAccessToken::findToken($yourToken);

        // Get the assigned user
        $user = $token->tokenable;
        //
        $data = array_merge($request->all(), ['user' => $user->id]);
        return ClientBasesCategories::create($data);

//        return ClientBasesCategories::create($request->all());
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
        return ClientBasesCategories::destroy($id);
    }
}
