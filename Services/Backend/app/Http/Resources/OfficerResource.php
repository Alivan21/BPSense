<?php

namespace App\Http\Resources;

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
            'id' => $this->id,
            'nip' => $this->nip,
            'name' => $this->name,
            'birth_date' => $this->birth_date,
            'status' => $this->status,
            'qrcode' => $this->qrcode ? Config::get('filesystems.disks.s3.url') . "/" . $this->qrcode : null,
            'profile' => $this->profile ? Config::get('filesystems.disks.s3.url') . "/" . $this->profile : null,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role->name,
            'images' => $this->images->map(function ($image) {
                return [
                    'url' => Config::get('filesystems.disks.s3.url') . "/" . $image->path
                ];
            })
        ];
    }
}
