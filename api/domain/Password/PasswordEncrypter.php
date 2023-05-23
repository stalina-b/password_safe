<?php

declare(strict_types=1);

namespace Domain\Password;

use Illuminate\Encryption\Encrypter;

class PasswordEncrypter
{
    protected Encrypter $encrypter;
    public string $key;
    const CIPHER = 'AES-256-CBC';

    public function __construct(?string $key = null)
    {
        if (is_null($key)) {
            $key = random_bytes(SODIUM_CRYPTO_BOX_NONCEBYTES);
        }

        $this->key = base64_encode($key);
        $this->encrypter = new Encrypter($this->key, self::CIPHER);

        return $this;
    }

    public static function encrypt(string $value, ?string $key = null): string
    {
        return (new PasswordEncrypter($key))->encrypter->encryptString($value);
    }

    public static function decrypt(string $payload, ?string $key = null): string
    {
        return (new PasswordEncrypter($key))->encrypter->decryptString($payload);
    }
}
