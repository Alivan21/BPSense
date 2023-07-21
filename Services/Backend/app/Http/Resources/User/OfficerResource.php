<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Config;

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
            'nip' => $this->nip,
            'birth_date' => $this->birth_date,
            'profile' => $this->profile ?? null,
            'images' => $this->images->map(function ($image) {
                return [
                    'url' => Config::get('filesystems.disks.s3.url') . "/" . $image->path
                ];
            })
        ];
    }
}
