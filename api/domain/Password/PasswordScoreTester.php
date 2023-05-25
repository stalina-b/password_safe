<?php

namespace Domain\Password;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;


class PasswordScoreTester
{
    public function validationScore($password)
    {
        $validator = Validator::make(['password' => $password], [
            'password' => [
                'required',
                'string',
                'min:12',
                'regex:/[a-z]/', // contains at least one lowercase letter
                'regex:/[A-Z]/', // contains at least one uppercase letter
                'regex:/[0-9]/', // contains at least one number
                'regex:/[!@#$%^&*]/', // contains at least one symbol
            ],
        ]);

        $score = 0;

        if ($validator->passes()) {
            $score++;

            $passwordLength = strlen($password);

            if ($passwordLength >= 12) {
                $score++;
            }

            $hasMixedCase = preg_match('/[a-z]/', $password) && preg_match('/[A-Z]/', $password);
            if ($hasMixedCase) {
                $score++;
            }

            $hasNumbers = preg_match('/[0-9]/', $password);
            if ($hasNumbers) {
                $score++;
            }

            $hasSymbols = preg_match('/[!@#$%^&*]/', $password);
            if ($hasSymbols) {
                $score++;
            }
        }

        return $score;
    }

    public function checkPassword(string $password)
    {
        $request = [
            'password' => $password,
        ];
        $validator = Validator::make(['password' => $password], [
            'password' => ['required', Password::min(1)->uncompromised()],
        ]);

        return !$validator->passes();
    }
    public function checkHaveibeenpwned(string $email)
    {
        $response = Http::withHeaders([
            'hibp-api-key' => config('keys.key'),
        ])->get('https://haveibeenpwned.com/api/v3/breachedaccount/'. $email);

        if ($response->successful()) {
            $jsonResponse = $response->json();
            return $jsonResponse;
        } else {
            return json_encode([$response->json()]);
        }
    }


}
