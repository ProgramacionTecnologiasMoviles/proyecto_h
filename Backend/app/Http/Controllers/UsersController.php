<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    
    public function index(Request $request)
    {
        $users=User::all();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $user=new User();
        $user->username =$request->username;
        $user->fullname =$request->fullname;
        $user->email =$request->email;
        $user->password =$request->password;
        $user->age =$request->age;
        $user->national_id=$request->national_id;
        $user->credits=$request->credits;
        $user->bankAccount_id=$request->bankAccount_id;
        $user->remember_token=$request->remember_token;
        $user->save();

        
        return response()->json(["message"=>"El Usuario ha sido creado exitosamente","status"=>200]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=User::find($id);
        $user->username =$request->username;
        $user->email =$request->email;
        $user->password =$request->password;
        $user->UserType =$request->UserType;
        $user->remember_token=$request->remember_token;
        $user->save();
        return response()->json("El Usuario se ha actualizado exitosamente",201);

    }

    /**
     * Display the specified resource.
     */
    public function destroy(string $id)
    {
        $user=User::find($id);
        $user->delete();
        return response()->json("El Usuario se ha eliminado exitosamente",201);
    }


}
