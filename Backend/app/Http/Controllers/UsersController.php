<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Matches;
use Illuminate\Support\Facades\Auth;
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
        $user->password =$request->password;
        $user->age =$request->age;
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

    /**
     * 
     *


     */

    public function name_players(Request $request){
        $winner=User::find($request->winner_id);
        $loser=User::find($request->loser_id);
        $result = [
            'winner_name' => $winner->username,
            'loser_name' => $loser->username,
        ];
        return response()->json($result);
    }
    public function add_credits(Request $request)
    {
        $user=User::find($request->id);
        $user->credits=$user->credits+$request->value;
        $user->save();
        return response()->json("El Usuario ha actualizado sus creditos",201);
    }
    public function updateCredits(Request $request){
        $data=$request->validate([
            'user_winner'=> 'required|exists:users,id',
            'user_loser'=> 'required|exists:users,id',
            'game_id'=> 'required|integer'
        ]);
        try{
            DB::beginTransaction();
            ## Encontramos los ususarios
            $winner=User::findorFail($data['user_winner']);
            $loser=User::findorFail($data['user_loser']);
            #Encontramos la partida 
            $match = Matches::find($request->game_id);
            ## Actualizamos los creditos 
            $winner->credits=$winner->credits + $match->creditsbetted;
            $loser->credits=$loser->credits - $match->creditsbetted;
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

    public function matchesHistory(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $wins = $user->matchesWon()->count();
        $losses = $user->matchesLose()->count();
        return response()->json(['wins' => $wins, 'losses' => $losses]);
    }

}
