<?php

namespace App\Http\Requests;

use App\Commons\Traits\ApiResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

abstract class apiRequest extends FormRequest
{
use ApiResponse;
    abstract public function rules();

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            $errors = (new ValidationException($validator))->errors();
            throw new HttpResponseException($this->apiError($errors, 'Validation Error.'));
        }

        parent::failedValidation($validator);
         // throw new \Illuminate\Validation\ValidationException($validator, $this->apiError($validator->errors()->messages(), 'Validation Error.'));
    }

    protected function failedAuthorization()
    {
        throw new AuthorizationException($this->apiError( '','You are not authorized.'));
    }

}
