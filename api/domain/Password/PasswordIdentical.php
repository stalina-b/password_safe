<?php

declare(strict_types=1);

namespace Domain\Password;

use App\Models\PasswordItem;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Auth;

class PasswordIdentical
{
    public static function is(string $password, string $masterPassword): bool
    {
        return !Auth::user()->passwordItems()->each(function(PasswordItem $passwordItem) use ($password, $masterPassword) {
            $decryptedPassword = '';

            try {
                $decryptedPassword = PasswordEncrypter::decrypt($passwordItem->password, $masterPassword);

            } catch (DecryptException) {

                return true;
            }

            return $password !== $decryptedPassword;
        });
    }
}
