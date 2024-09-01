<?php

namespace App\Http\Controllers;
use App\Models\Matches;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $match=Matches::all();
        return response()->json($bank);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
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

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bank=Matches::find($id);
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
        $bank=Matches::find($id);
        $bank->delete();
        return response()->json("El Registro de la partida se ha eliminado exitosamente",200);
    }

}
