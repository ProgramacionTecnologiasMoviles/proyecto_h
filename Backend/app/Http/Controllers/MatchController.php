<?php

namespace App\Http\Controllers;
use App\Models\Matched;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $match=Matched::all();
        return response()->json($bank);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $match=new Matched();
        $match->hostUser =$request->hostUser;
        $match->guessUser =$request->guessUser;
        $match->creditsbetted =$request->guess_user;
        $match->game =$request->game;
        $match->winner =$request->winner;
        $match->loser =$request->loser;
        $match->score =$request->score;
        $bank->save();

        return response()->json("El registro de la partida se ha agregado exitosamente",201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bank=Matched::find($id);
        $match->hostUser =$request->hostUser;
        $match->guessUser =$request->guessUser;
        $match->creditsbetted =$request->guess_user;
        $match->game =$request->game;
        $match->winner =$request->winner;
        $match->loser =$request->loser;
        $match->score =$request->score;
        $bank->save();

        return response()->json("El Registro de la partida se ha actualizado exitosamente",200);

    }

    /**
     * Display the specified resource.
     */
    public function destroy(string $id)
    {
        $bank=Matched::find($id);
        $bank->delete();
        return response()->json("El Registro de la partida se ha eliminado exitosamente",200);
    }

}
