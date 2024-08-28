<?php

namespace App\Http\Controllers;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $bank=Game::all();
        return response()->json($bank);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $bank=new Game();
        $bank->name =$request->name;
        $bank->description =$request->description;
        $bank->save();

        return response()->json("El registro del juego se ha agregado exitosamente",201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bank=Game::find($id);
        $bank->name =$request->name;
        $bank->description =$request->description;
        $bank->save();

        return response()->json("El Registro del juego se ha actualizado exitosamente",200);

    }

    /**
     * Display the specified resource.
     */
    public function destroy(string $id)
    {
        $bank=Game::find($id);
        $bank->delete();
        return response()->json("El Registro del juego se ha eliminado exitosamente",200);
    }

}
