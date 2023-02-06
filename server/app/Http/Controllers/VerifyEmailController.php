<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;

class VerifyEmailController extends Controller
{

    public function __invoke(Request $request): RedirectResponse
    {
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return redirect(env('FRONT_URL') . '/email/verify/already-success');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect(env('FRONT_URL') . '/email/verify/success');
    }
    public function contact() {
        if($this->isOnline()){
            $mail_data = [
                'recipient'=>'vivante.des@gmail.com',
                'fromEmail'=>'vivante.des@gmail.com',
                'fromName'=>'name',
                'subject'=>'subject',
                'body'=>'message',
            ];

            \Mail::send('email-template', $mail_data, function($message) use ($mail_data){
                $message->to($mail_data['recipient'])
                    ->from($mail_data['fromEmail'], $mail_data['fromName'])
                    ->subject($mail_data['subject']);
            });

        }else{
            return "Missing connection.";
        }
    }

    public function isOnline($site = "https://youtube.com/"){
        if(@fopen($site, 'r')){
            return true;
        }else{return false;}
    }
}
