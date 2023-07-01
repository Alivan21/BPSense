<?php

namespace App\Http\Requests\Admin\Officer;

use Illuminate\Foundation\Http\FormRequest;

class OfficerStoreRequest extends FormRequest
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
            'name' => "required|string|regex:/^[A-Za-z\s']+$/",
            'nip' => 'required|numeric|digits:16|unique:users',
            'phone' => 'numeric|digits_between:11,14|unique:users',
            'username' => 'string|regex:/^[A-Za-z0-9_.]+$/|not_regex:/\s/|unique:users',
            'email' => 'email|not_regex:/\s/|unique:users',
        ];
    }
}
