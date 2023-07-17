<?php

namespace App\Services\Officer;

use App\Models\User;
use App\Repositories\Officer\OfficerRepository;
use App\Repositories\OfficerImage\OfficerImageRepository;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Storage\StorageRepository;

use App\Repositories\Officer\OfficerRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

// use App\Repositories\OfficerImage\OfficerImageRepositoryInterface;
// use App\Repositories\Role\RoleRepositoryInterface;
// use App\Repositories\Storage\StorageRepositoryInterface;

class OfficerService
{
    protected $officerRepository, $roleRepository, $officerImageRepository, $storageRepository;

    public function __construct(OfficerRepositoryInterface $officerRepository, RoleRepository $roleRepository, OfficerImageRepository $officerImageRepository, StorageRepository $storageRepository)
    {
        $this->officerRepository = $officerRepository;
        $this->roleRepository = $roleRepository;
        $this->officerImageRepository = $officerImageRepository;
        $this->storageRepository = $storageRepository;
    }

    public function update(User $officer, array $data)
    {
        if ($officer->profile) {
            $this->storageRepository->delete($officer->profile);
        }
        $data['profile'] = $this->storageRepository->putFile(hash('sha256', $officer->id) . '/profile', $data['profile'], 'public');

        return $this->officerRepository->updateData($officer, $data) ? $officer->refresh() : false;
    }

    public function updateDataSetImages(User $officer, array $dataImages = [])
    {   
        if ($dataImages !== [] && count($dataImages['image']) > 0) {
            foreach ($officer->images as $officerImage) {
                $this->storageRepository->delete($officerImage->path);
                $officerImage->delete();
                $officerImage->forceDelete();
            }

            foreach ($dataImages['image'] as $image) {
                $path = $this->storageRepository->putFile(hash('sha256', $officer->id), $image, 'public');
                $this->officerImageRepository->createData([
                    'path' => $path,
                    'user_id' => $officer->id
                ]);

                // $client = new Client();
                // $response = $client->post('https://teachablemachine.withgoogle.com/models/Qb16rx5VJ/inputs',
                //     [
                //         'json' => [
                //             'label' => $officer->id,
                //             'imageUrl' => Storage::url($path),
                //         ],
                //     ]
                // );
            }
        }
        
        return $officer->refresh();
    }

    public function updatePassword(User $officer, array $data) {
        return $this->officerRepository->updatePassword($officer, $data['password']) ? $officer->refresh() : false;
    }
}
