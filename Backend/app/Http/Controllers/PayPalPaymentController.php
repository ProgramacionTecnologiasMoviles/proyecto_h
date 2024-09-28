<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
class PayPalPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function access_token(Request $request)
    {        
        $clientId = env('CLIENT_ID');
        $clientSecret = env('CLIENT_SECRET');
        $endpointUrl = env('ENDPOINT'); 

        $response = Http::withBasicAuth($clientId, $clientSecret)
                        ->asForm()
                        ->post($endpointUrl . '/v1/oauth2/token', [
                            'grant_type' => 'client_credentials'
                        ]);

        if ($response->successful()) {
            $accessToken = $response->json()['access_token'];
            return $accessToken;
        } else {
            return response()->json(['error' => 'Failed to retrieve access token'], 400);
        }
    }

    public function confirmPaymentSource(Request $request)
    {
        $endpointUrl = env('ENDPOINT'); 
        $accessToken=$this->access_token($request);
        $currency = $request->currency;
        $value = $request->value;
        $payload = [
            'intent' => 'CAPTURE',
            'purchase_units'=> [
                [
                'amount'=>[
                'currency_code' => $currency,
                'value' =>  $value]
                ]
                
            ],
            
        ];

        $apiResponse = Http::withHeaders([
            'Authorization' => 'Bearer '. $accessToken,
            'Content-Type' => 'application/json',
            'PayPal-Request-Id' =>'7b92603e-77ed-4896-8e78-5dea2050476a',
        ])->post($endpointUrl.'/v2/checkout/orders',$payload);

        if($apiResponse->successful()){
            return response()->json(['response' => $apiResponse->json()]);
        }
        else {
            Log::error('API Call Failed: ' . $apiResponse->body());
            return response()->json(['error' => $apiResponse->body()], 400);
        }
    }

    public function validationPayment(Request $request)
    {
        $endpointUrl = env('ENDPOINT'); 
        $accessToken=$this->access_token($request);
        $currency = $request->currency;
        $value = $request->value;
        $order_id=$request->order;
        $payload = [
            'intent' => 'CAPTURE',
            'purchase_units'=> [
                [
                'amount'=>[
                'currency_code' => $currency,
                'value' =>  $value]
                ]
                
            ], 
            
        ];

        $apiResponse = Http::withHeaders([
            'Authorization' => 'Bearer '. $accessToken,
            'Content-Type' => 'application/json',
        ])->post($endpointUrl.'/v2/checkout/orders/',$order_id,'/captures');

        if($apiResponse->successful()){
            return response()->json(['response' => $apiResponse->json()]);
        }
        else {
            Log::error('API Call Failed: ' . $apiResponse->body());
            return response()->json(['error' => $apiResponse->body()], 400);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
