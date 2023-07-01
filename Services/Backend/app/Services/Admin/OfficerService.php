<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\UserImage;
use App\Repositories\Admin\Officer\OfficerRepository;
use App\Repositories\Admin\OfficerImage\OfficerImageRepository;
use App\Repositories\Role\RoleRepository;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class OfficerService
{
    protected $officerRepository, $roleRepository;

    public function __construct(OfficerRepository $officerRepository, RoleRepository $roleRepository)
    {
        $this->officerRepository = $officerRepository;
        // $this->officerImageRepository = $officerImageRepository;
        $this->roleRepository = $roleRepository;
    }

    public function index()
    {
        return $this->officerRepository->getAllData();
    }

    public function store(array $data, array $dataImages = [])
    {
        $data['password'] = Hash::make('password');
        $data['role_id'] = $this->roleRepository->getIdbyRoleName('officer');
        $officer = $this->officerRepository->createData($data);

        if ($dataImages !== [] && count($dataImages['image']) > 0) {
            foreach ($dataImages['image'] as $image) {
                $path = Storage::putFile(hash('sha256', $officer->id), $image);
                Storage::setVisibility($path, 'public');

                $dataInput['url'] = Config::get('filesystems.disks.s3.url') . "/" . $path;
                $dataInput['path'] = $path;
                $dataInput['user_id'] = $officer->id;
                UserImage::create($dataInput);
            }
        }

        return $officer;
    }

    public function update(User $officer, array $data, array $dataImages = [])
    {   
        if ($dataImages !== [] && count($dataImages['image']) > 0) {
            foreach ($officer->images as $officerImage) {
                Storage::delete($officerImage->path);
                $officerImage->delete();
                $officerImage->forceDelete();
            }

            foreach ($dataImages['image'] as $image) {
                $path = Storage::putFile(hash('sha256', $officer->id), $image);
                Storage::setVisibility($path, 'public');

                $dataInput['url'] = Config::get('filesystems.disks.s3.url') . "/" . $path;
                $dataInput['path'] = $path;
                $dataInput['user_id'] = $officer->id;
                UserImage::create($dataInput);
            }
        }

        return $this->officerRepository->updateData($officer, $data) ? $officer->refresh() : false;
    }

    public function delete(User $officer)
    {   
        return $this->officerRepository->deleteData($officer);;
    }

    public function search(string $keyword)
    {
        return $this->officerRepository->searchDataWithNameOrNip($keyword);
    }


}
