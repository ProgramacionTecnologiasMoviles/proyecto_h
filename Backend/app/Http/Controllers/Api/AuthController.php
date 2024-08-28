<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function iniciarsesion(request $request){
        $credentials=Validator::make($request->all(),[
            'username' => 'required',
            'email' => 'require|email|unique:users',
            'password' => 'required|string'
        ]);
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response(["message"=>"Credenciales invalidas"],501);
        }
     
        return response()->json(["token"=>$user->createToken("token")->plainTextToken]);

    }
}