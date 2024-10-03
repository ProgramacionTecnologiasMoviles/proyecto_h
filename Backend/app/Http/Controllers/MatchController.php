<?php

namespace App\Http\Controllers;
use App\Models\Matches;
use App\Models\User;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $match=Matches::all();
        return response()->json($match);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $hostUser = User::find($request->hostUser);
        $guessUser = User::find($request->guessUser);
        if ($guessUser === null) {
            return response()->json(['error' => 'Usuario visitante no encontrado'], 404);
        }
        if($hostUser->credits < $request->creditsbetted  || $guessUser->credits < $request->creditsbetted ){
            return response()->json("Ambos jugadores deben tener la cantidad de creditos suficientes", 500);
        }
        $match=new Matches();
        $match->hostUser =$request->hostUser;
        $match->guessUser =$request->guessUser;
        $match->creditsbetted =$request->creditsbetted;
        $match->game =$request->game;
        $match->winner =$request->winner;
        $match->loser =$request->loser;
        $match->score =$request->score;
        $match->save();

        return response()->json(['id' => $match->id], 201);
    }

    public function create_match(Request $request)
    {
        $hostUser = User::find($request->hostUser);
        if($hostUser->credits < $request->creditsbetted ){
            return response()->json("Creditos insuficientes", 500);
        }
        $match=new Matches();
        $match->hostUser =$request->hostUser;
        $match->creditsbetted =$request->creditsbetted;
        $match->game =$request->game;
        $match->save();
        $match_id = sprintf('%04d', $match->id);

        return response()->json(['id' =>$match_id], 201);
    }
    public function update_match(Request $request)
    {
        $match = Matches::find($request->id);
        $match->hostUser =$request->hostUser;
        $match->guessUser =$request->guessUser;
        $match->creditsbetted =$request->creditsbetted;
        $match->game =$request->game;
        $match->winner =$request->winner;
        $match->loser =$request->loser;
        $match->score =$request->score;
        $match->save();
        return response()->json("Se ha actualizado la partida con la informacion nueva ", 201);
    }
    
    public function join_match(Request $request)
    {
        $hostUser = User::find($request->hostUser);
        $guessUser = User::find($request->guessUser);
        
        if($hostUser->credits < $request->creditsbetted  || $guessUser->credits < $request->creditsbetted ){
            return response()->json("Ambos jugadores deben tener la cantidad de creditos suficientes", 401);
        }
        $match=Matches::find($request->id);
        $match->guessUser =$request->guessUser;
        $match->save();

        return response()->json(['el jugador se ha unido a la partida correctamente  '], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $match=Matches::find($id);
        $match->hostUser =$request->hostUser;
        $match->guessUser =$request->guessUser;
        $match->creditsbetted =$request->creditsbetted;
        $match->game =$request->game;
        $match->winner =$request->winner;
        $match->loser =$request->loser;
        $match->score =$request->score;
        $match->save();

        return response()->json("El Registro de la partida se ha actualizado exitosamente",200);

    }
    public function add_player_match(Request $request)
    {
        $match = Matches::findOrFail($request->id);
        $guessUser = User::find($request->guessUser);

        if ($match->creditsbetted > $guessUser->credits){
            return response()->json("Creditos insuficientes", 500);
        }
        $match->update($request->only(['guessUser']));
        return response()->json("se agrego el jugador al match",200);

    }
    public function match_info(Request $request)
    {
        $match = Matches::findOrFail($request->id);
        return response()->json($match,200);

    }

    /**

    */
    public function destroy(string $id)
    {
        $bank=Matches::find($id);
        $bank->delete();
        return response()->json("El Registro de la partida se ha eliminado exitosamente",200);
    }

}
