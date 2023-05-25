<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
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
                'search' => 'string|min:3|max:255',
                'orderBy' => 'string|in:title,username',
                'desc' => 'boolean',
                'page' => 'integer|min:1',
                'perPage' => 'integer|min:1|max:100'
            ];
    }
}
