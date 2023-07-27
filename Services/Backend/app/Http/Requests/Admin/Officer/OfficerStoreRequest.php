<?php

namespace App\Http\Requests\Admin\Officer;

use App\Http\Requests\apiRequest;
use Carbon\Carbon;

class OfficerStoreRequest extends apiRequest
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
            'nip' => 'required|numeric|digits:18|unique:users',
            'name' => "required|string|regex:/^[A-Za-z\s']+$/",
            'birth_date' => ['required', 'date', 
                function ($attribute, $value, $fail) {
                    if (!Carbon::hasFormat($value, 'Y-m-d')) {
                        $fail('Kolom tanggal lahir harus berupa tanggal dengan format Y-m-d.');
                        return;
                    }

                    $minDate = now()->subYears(60)->startOfDay();
                    $maxDate = now()->subYears(15)->endOfDay();
                    $inputDate = Carbon::parse($value);

                    if ($inputDate->lessThan($minDate) || $inputDate->greaterThan($maxDate)) {
                        $fail('Kolom tanggal lahir antara tahun ' . now()->subYears(60)->format('Y') . ' sampai ' . now()->subYears(15)->format('Y') . '.');
                    }
                },
            ],
            'phone' => 'numeric|digits_between:11,15|unique:users',
            'email' => 'email|not_regex:/\s/|unique:users',
        ];
    }

    public function messages()
    {
        return [
            'nip.required' => 'Kolom NIP harus diisi.',
            'nip.numeric' => 'Kolom NIP harus berupa angka.',
            'nip.digits' => 'Kolom NIP harus terdiri dari 18 digit.',
            'nip.unique' => 'Kolom NIP sudah digunakan oleh pengguna lain.',
            'name.required' => 'Kolom nama harus diisi.',
            'name.string' => 'Kolom nama harus berupa teks.',
            'name.regex' => 'Kolom nama hanya dapat mengandung huruf dan spasi.',
            'birth_date.required' => 'Kolom tanggal lahir harus diisi.',
            'birth_date.date' => 'Kolom tanggal lahir harus berupa tanggal yang valid.',
            'phone.numeric' => 'Kolom nomor telepon harus berupa angka.',
            'phone.digits_between' => 'Kolom nomor telepon harus terdiri dari 11 hingga 15 digit.',
            'phone.unique' => 'Kolom nomor telepon sudah digunakan oleh pengguna lain.',
            'email.email' => 'Kolom email harus berupa alamat email yang valid.',
            'email.not_regex' => 'Kolom email tidak boleh mengandung spasi.',
            'email.unique' => 'Kolom email sudah digunakan oleh pengguna lain.',
        ];
    }
}
