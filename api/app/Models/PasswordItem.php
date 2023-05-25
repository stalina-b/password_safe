<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use Domain\Password\PasswordEncrypter;
use Illuminate\Support\Facades\Auth;

class PasswordItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'password',
        'username',
        'note',
        'user_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
