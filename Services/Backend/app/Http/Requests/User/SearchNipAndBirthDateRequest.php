<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SearchNipAndBirthDateRequest extends FormRequest
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
            'nip' => 'required|numeric|digits:18',
            'birth_date' => 'required|date'
        ];
    }
    
    public function messages()
    {
        return [
            'nip.required' => 'Kolom NIP harus diisi.',
            'nip.numeric' => 'Kolom NIP harus berupa angka.',
            'nip.digits' => 'Kolom NIP harus terdiri dari 18 digit.',
            'birth_date.required' => 'Kolom tanggal lahir harus diisi.',
            'birth_date.date' => 'Kolom tanggal lahir harus berupa tanggal yang valid.',
        ];
    }
}
