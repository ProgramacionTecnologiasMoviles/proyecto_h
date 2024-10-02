<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;




class PaypalController extends Controller
{
    public function generateAccessToken()
    {
        $clientId = 'AeVNUDFQXKq1uSr-vbLe9TK9uehNOx_BCFyLLpJAl_q0d15Rb8KzX1aDGQYObb3KblKTduurg_SDPOXL';
        $clientSecret = 'EDut3hn4OEqRvj8bej9jK5uBkjXsHIR4bk8YOC74SMO1jNQJ3i611ZXqcB0S6F9XfcdDgnGPJ_QAMb-z';

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
            // Check if the response is from Http Client or Guzzle
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
            // Log the error if needed
            // Log::error('Exception caught', ['message' => $e->getMessage()]);
            return [
                'error' => $e->getMessage(),
                'httpStatusCode' => $statusCode ?? 500, // Default to 500 if status code isn't set
            ];
        }
    }


    public function createOrder(){


        $accessToken = $this->generateAccessToken();

        $url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'; 
        
        $payload = [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => '10',
                    ],
                ],
            ],
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
    
        $orderID = $request->orderId; 

        $accessToken = $this->generateAccessToken();

        $base = 'https://api-m.sandbox.paypal.com';
        

        $url = "{$base}/v2/checkout/orders/{$orderID}/capture";

        $client = new Client(['verify' => false]);

        
        $response = $client->post($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer $accessToken"
            ]
        ]);

        // Handle the response
        return $this->handleResponse($response);
    }

}
