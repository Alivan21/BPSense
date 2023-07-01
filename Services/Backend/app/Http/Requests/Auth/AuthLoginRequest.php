<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\apiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AuthLoginRequest extends apiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'identifier' => 'required', 
            'password' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'identifier.required' => 'Kolom username / nip wajib diisi.',
            'password.required' => 'Kolom password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
        ];
    }
}
