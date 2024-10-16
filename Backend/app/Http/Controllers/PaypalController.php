<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\User;




class PaypalController extends Controller
{
    public function generateAccessToken()
    {
        $clientId = env('CLIENT_ID');
        $clientSecret = env('CLIENT_SECRET');

        $base64EncodedClientIdAndSecret = base64_encode("$clientId:$clientSecret");

        $client = new Client(['verify' => false]);  

        $response = $client->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
            'headers' => [
                'Authorization' => 'Basic ' . $base64EncodedClientIdAndSecret,
            ],
            'form_params' => [
                'grant_type' => 'client_credentials',
                'response_type' => 'id_token',
                'intent' => 'sdk_init',
            ],
        ]);

        $body = json_decode($response->getBody()->getContents(), true);

        return $body['access_token'];
    }


    public function handleResponse($response)
    {
        try {
            $isGuzzleResponse = method_exists($response, 'getStatusCode');

            $statusCode = $isGuzzleResponse ? $response->getStatusCode() : $response->status();
            $body = $isGuzzleResponse ? json_decode($response->getBody()->getContents(), true) : $response->json();

            if ($statusCode >= 200 && $statusCode < 300) {

                return [
                    'data' => $body,
                    'httpStatusCode' => $statusCode,
                ];
            } else {
                throw new Exception($body['message'] ?? 'Error occurred.');
            }
        } catch (Exception $e) {

            return [
                'error' => $e->getMessage(),
                'httpStatusCode' => $statusCode ?? 500, // Default to 500 if status code isn't set
            ];
        }
    }


    public function createOrder(Request $request){


        $accessToken = $this->generateAccessToken();

        $url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'; 


        $payload = [
        "intent" => "CAPTURE",
        "purchase_units" => [
            [
                "amount" => [
                    "currency_code" => $request->currency,
                    "value" => $request->value
                ]
            ]
        ],
        "payment_source" => [
            "paypal" => [
                "experience_context" => [
                    "payment_method_preference" => "IMMEDIATE_PAYMENT_REQUIRED",
                    "brand_name" => "EXAMPLE INC",
                    "locale" => "en-US",
                    "landing_page" => "LOGIN",
                    "user_action" => "PAY_NOW",
                    "return_url" => "https://example.com/returnUrl",
                    "cancel_url" => "https://example.com/cancelUrl"
                ]
            ]
        ]
    ];
        try {
            $response = Http::withToken($accessToken)
                ->withOptions(['verify' => false])
                ->post($url, $payload);

            return $this->handleResponse($response);
        } catch (Exception $e) {
            throw new Exception("Error creating PayPal order: " . $e->getMessage());
        }
    }


    public function captureOrder(Request $request)
    {
    
        $order_id = $request->order_id; 

        $accessToken = $this->generateAccessToken();

        $base = 'https://api-m.sandbox.paypal.com';
        

        $url = "{$base}/v2/checkout/orders/{$order_id}/capture";

        $client = new Client(['verify' => false]);

        
        $response = $client->post($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer $accessToken"
            ]
        ]);

        // Handle the response
        $response = $this->handleResponse($response);
        if ($response['data']['status'] === 'COMPLETED'){
            $user = User::find($request->user_id);
            $newCredits = (float) $response['data']['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
            $user->credits=$user->credits + $newCredits;
            $user->save();
            return response()->json("Credits added",201);
        }

        return response()->json("Payment failed", 500);
    }

}
