<?php

namespace App\Http\Controllers\Securuity;

use App\Http\Controllers\Controller;
use App\Http\Requests\SecuirtyCheckRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use Domain\Password\PasswordEncrypter;
use Domain\Password\PasswordScoreTester;
use Illuminate\Http\Request;

class SecurityCheckController extends Controller
{
    public function checkAllPasswords(SecuirtyCheckRequest $request)
    {
        $masterPassword = base64_decode($request->input('master_password'));
        // get all passwords where email in database
        $passwords = PasswordItemResource::collection(PasswordItem::where('user_id', $request->user()->id)->get());
        // for loop over the passwords and decrypt them
        // create new array to append to
        $scores = [];
        foreach ($passwords as $password) {
            $temp = PasswordEncrypter::decrypt($password->password, $masterPassword);
            $tempscore = (new \Domain\Password\PasswordScoreTester)->validationScore($temp);
            $pwned = (new \Domain\Password\PasswordScoreTester)->checkPassword($temp);
            $scores[] = ['password' => $password->title, 'score' => $tempscore, 'pwned' => $pwned];
        }
        $hbip = (new \Domain\Password\PasswordScoreTester)->checkHaveibeenpwned($request->user()->email);

        return json_encode(['master_password' => $masterPassword, 'passwords' => $scores, 'hbip' => $hbip]);
    }
}
