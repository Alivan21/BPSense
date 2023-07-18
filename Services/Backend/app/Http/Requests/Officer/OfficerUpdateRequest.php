<?php

namespace App\Http\Requests\Officer;

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
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'phone' => 'required|numeric|digits_between:11,15|' . Rule::unique('users')->ignore(auth()->user()->id),
            'email' => 'required|email|not_regex:/\s/|' . Rule::unique('users')->ignore(auth()->user()->id),
        ];
    }
}
