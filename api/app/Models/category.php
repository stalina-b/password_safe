<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\PasswordItem;

class category extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'user_id',
    ];

    public function passwordItems(): HasMany
    {
        return $this->hasMany(PasswordItem::class);
    }
}
