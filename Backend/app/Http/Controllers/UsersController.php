<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $user->fullname =$request->fullname;
        $user->email =$request->email;
        $user->password =$request->password;
        $user->age =$request->age;
        $user->national_id=$request->national_id;
        $user->credits=$request->credits;
        $user->bankAccount_id=$request->bankAccount_id;
        $user->remember_token=$request->remember_token;
        $user->save();
        return response()->json("El Usuario se ha actualizado exitosamente",201);

    }

    public function addcredits(Request $request)
    {
        $validatedData = $request->validate([
            'credits' => 'required|integer|min:0',
            'id' => 'required|string|max:255'
        ]);
        $user = User::find($validatedData['id']);
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        $user->credits += $validatedData['credits']; 
        $user->save(); 
        return response()->json("El Usuario ha actualizado sus créditos exitosamente.", 201);
    }
    

    public function destroy(string $id)
    {
        $user=User::find($id);
        $user->delete();
        return response()->json("El Usuario se ha eliminado exitosamente",201);
    }

    /**


     */
    public function update_credits(Request $request){
        $data=$request->validate([
            'user_winner'=> 'required|exists:users,id',
            'user_loser'=> 'required|exists:users,id',
            'credits_bet'=> 'required|integer'
        ]);
        try{
            DB::beginTransaction();
            $winner=User::findorFail($data['user_winner']);
            $loser=User::findorFail($data['user_loser']);
            $winner->credits=$winner->credits + $data['credits_bet'];
            $loser->credits=$loser->credits - $data['credits_bet'];
            $winner->save();
            $loser->save();
            DB::commit();
            return response()->json(['message' => 'Los creditos de los usuarios se han actualizado'], 200);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['error' => 'Error al actualizar loss creditos de los usuarios'], 500);
            
        }
            
        
    }
/*
----------------------------leaderboard--------------------------------------
 */


    public function leaderBoardWins(Request $request){
        $users = User::select(['id', 'fullname','credits'])
        ->withCount('matchesWon')
        ->orderBy('matches_won_count', 'desc')
        ->get(['id', 'fullname as name']);
    
        return response()->json($users);
    }
/*
----------------------------totalcredits won / lose----------------------------------------
 */
    public function totalCreditsWon(Request $request,string $id)
    {
        $user = User::where('id', $id)->first(['id', 'fullName as name']);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $totalCreditsWon = $user->matchesWon()->sum('creditsbetted');
        $result = [
            'id' => $user->id,
            'name' => $user->name,
            'total_credits_won' => $totalCreditsWon
        ];
        return response()->json($result);

    }
    public function totalCreditsLose(Request $request,string $id)
    {
        $user = User::where('id', $id)->first(['id', 'fullName as name']);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $totalCreditsWon = $user->matchesLose()->sum('creditsbetted');
        $result = [
            'id' => $user->id,
            'name' => $user->name,
            'total_credits_won' => $totalCreditsWon
        ];
        return response()->json($result);

    }

}
