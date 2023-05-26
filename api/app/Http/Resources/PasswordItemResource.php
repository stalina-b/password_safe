<?php

namespace App\Http\Resources;

use App\Models\PasswordItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PasswordItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @mixin PasswordItem
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'password' => $this->password,
            'note' => $this->note,
            'username' => $this->username,
            'user' => $this->user,
            'category' => $this->category,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
