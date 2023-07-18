<?php

namespace App\Http\Requests\Admin\Officer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OfficerUpdateRequest extends FormRequest
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
            'nip' => 'required|numeric|digits:16|' . Rule::unique('users')->ignore($this->route('officer')),
            'phone' => 'numeric|digits_between:11,14|' . Rule::unique('users')->ignore($this->route('officer')),
            'email' => 'email|not_regex:/\s/|' . Rule::unique('users')->ignore($this->route('officer')),
        ];
    }
}
