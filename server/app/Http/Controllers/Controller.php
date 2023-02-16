<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function index(){
        $data = [
            'item0' => 'Test feedback...',
            'item1' => 'bla-bla',
            'item2' => 'bla-bla 2',
        ];

        return $data;
    }

    public function redirect_post() {
        $endpoint = 'https://wms.evilcode.space';
//        $endpoint = 'https://wms.evilcode.space/auth';
        $data = [];

        $user = Auth::user();
        $data['id'] = $user->id;
        $data['name'] = $user->name;
        $data['role'] = $user->role;
        $data['token'] = $user->createToken('myapptoken')->plainTextToken;


        $json = implode($data);
        $query = http_build_query($data);

        echo '<pre>';
        echo var_dump($query);
        echo '</pre>';

//        return view('welcome');
        return redirect()->to($endpoint.'?'.$query);
    }
}
