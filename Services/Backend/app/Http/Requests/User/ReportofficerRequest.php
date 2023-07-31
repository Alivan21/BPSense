<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ReportofficerRequest extends FormRequest
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
            'nip' => 'required|string',
            'name' => 'required|string',
            'birthdate' => 'required|string',
            'message' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'nip.required' => 'NIP harus diisi',
            'nip.string' => 'NIP harus berupa string',
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'birthdate.required' => 'Tanggal lahir harus diisi',
            'birthdate.string' => 'Tanggal lahir harus berupa string',
            'message.required' => 'Pesan harus diisi',
            'message.string' => 'Pesan harus berupa string',
            'image.required' => 'Foto harus diisi',
            'image.image' => 'Foto harus berupa gambar',
            'image.mimes' => 'Foto harus berupa gambar dengan format jpeg, png, jpg, gif, svg',
        ];
    }
}
