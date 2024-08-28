<?php

namespace App\Http\Controllers;
use App\Models\BankAccount;
use Illuminate\Http\Request;

class bankAccountController extends Controller
{
    public function index(Request $request)
    {
        $bank=BankAccount::all();
        return response()->json($bank);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $bank=new BankAccount();
        $bank->bank_name =$request->bank_name;
        $bank->date_of_use =$request->date_of_use;
        $bank->account_number =$request->account_number;
        $bank->save();

        return response()->json("El Registro Bancario se ha agregado exitosamente",201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bank=BankAccount::find($id);
        $bank->bank_name =$request->bank_name;
        $bank->date_of_use =$request->date_of_use;
        $bank->account_number =$request->account_number;
        $bank->save();

        return response()->json("El Registro Bancario se ha actualizado exitosamente",200);

    }

    /**
     * Display the specified resource.
     */
    public function destroy(string $id)
    {
        $bank=BankAccount::find($id);
        $bank->delete();
        return response()->json("El Registro bancario se ha eliminado exitosamente",200);
    }

    
}
