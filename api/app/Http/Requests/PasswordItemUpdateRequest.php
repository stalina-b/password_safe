<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class PasswordItemUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|min:1|max:255',
            'category_id' => 'integer|exists:categories,id',
            'username' => 'string|min:1|max:255',
            'note' => 'string|min:1',
            'master_password' => 'required_with:password|string|max:255',
            'password' => Password::min(6)
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised(),
        ];
    }
}
