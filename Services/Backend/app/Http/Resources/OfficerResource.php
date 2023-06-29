<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OfficerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'username' => $this->username,
            'nip' => $this->nip,
            'email' => $this->email,
            'phone' => $this->phone,
            'images' => $this->images->map(function ($image) {
                return [
                    'url' => $image->url
                ];
            })
        ];
    }
}
