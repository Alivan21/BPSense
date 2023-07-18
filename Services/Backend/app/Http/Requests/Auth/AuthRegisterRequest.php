<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\apiRequest;
use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends apiRequest
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
            'name' => 'required|string|max:255',
            'nip' => 'required|unique:users,nip|string|numeric',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'required|string|max:15',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'name.max' => 'Nama maksimal 255 karakter',
            'nip.required' => 'nip harus diisi',
            'nip.string' => 'nip harus berupa string',
            'nip.unique' => 'nip sudah terdaftar',
            'nip.numeric' => 'nip harus berupa angka',
            'password.required' => 'Password harus diisi',
            'password.string' => 'Password harus berupa string',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Password tidak cocok',
            'phone_number.required' => 'Nomor telepon harus diisi',
            'phone_number.string' => 'Nomor telepon harus berupa string',
            'phone_number.max' => 'Nomor telepon maksimal 15 karakter',
        ];
    }
}
