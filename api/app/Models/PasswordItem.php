<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'password',
        'e-mail',
        'note',
    ];

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

        if ($score <= 1) {
            return false; // Bad
        } elseif ($score <= 3) {
            return false; // Medium
        } else {
            return true; // Good
        }
    }
}
