<?php

namespace App\Http\Requests;

use App\Commons\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;

abstract class apiRequest extends FormRequest
{
    use ApiResponse;
   abstract public function rules();

   protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
   {
      throw new \Illuminate\Validation\ValidationException($validator, $this->apiError( $validator->errors(), 'Validation Error.', 400));
   }

   protected function failedAuthorization()
   {
      throw new \Illuminate\Auth\Access\AuthorizationException($this->apiError( '','You are not authorized.'));
   }

}
