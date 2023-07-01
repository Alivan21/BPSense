<?php
namespace App\Repositories\Admin\OfficerImage;

use App\Models\UserImage;
use Illuminate\Database\Eloquent\Builder;

class OfficerImageRepository implements OfficerImageRepositoryInterface
{
    protected Builder $query;

    public function __construct(UserImage $userImage)
    {
        $this->query = $userImage->query();
    }

    public function getAllDatabyOfficerId(string $id){
        return $this->query->with(['officer'])->whereHas('officer', function ($officer) {
            $officer->where('user_id', $officer->id);
        })->get();
    }

    public function createData(array $data) {
        return $this->query->create($data);
    }

}