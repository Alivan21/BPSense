<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property User $resource
 */
class UserResource extends JsonResource
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
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'nip' => $this->resource->nip,
            'phone_number' => $this->resource->phone_number,
            'role' => $this->resource->role,
        ];
    }
}
