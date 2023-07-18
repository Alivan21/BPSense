<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Repositories\Admin\Officer\OfficerRepository;
use App\Repositories\OfficerImage\OfficerImageRepository;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Storage\StorageRepository;

use App\Repositories\Admin\Officer\OfficerRepositoryInterface;
// use App\Repositories\OfficerImage\OfficerImageRepositoryInterface;
// use App\Repositories\Role\RoleRepositoryInterface;
// use App\Repositories\Storage\StorageRepositoryInterface;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Hash;

class OfficerService
{
    protected $officerRepository, $roleRepository, $officerImageRepository, $storageRepository;

    public function __construct(OfficerRepositoryInterface $officerRepository, RoleRepository $roleRepository, OfficerImageRepository $officerImageRepository, StorageRepository $storageRepository)
    {
        $this->officerRepository = $officerRepository;
        $this->officerImageRepository = $officerImageRepository;
        $this->roleRepository = $roleRepository;
        $this->storageRepository = $storageRepository;
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

        $this->officerRepository->updateQrCode($officer, $this->generateQrCode($officer));
        
        if ($dataImages !== [] && count($dataImages['image']) > 0) {
            $this->addDatasetImages($officer, $dataImages);
        }

        return $officer->refresh();
    }

    public function update(User $officer, array $data, array $dataImages = [])
    {   
        if ($dataImages !== [] && count($dataImages['image']) > 0) {
            foreach ($officer->images as $officerImage) {
                $this->storageRepository->delete($officerImage->path);
                $officerImage->delete();
                $officerImage->forceDelete();
            }

            $this->addDatasetImages($officer, $dataImages);
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

    protected function addDatasetImages(User $officer, array $dataImages){
        foreach ($dataImages['image'] as $image) {
            $this->officerImageRepository->createData([
                'path' => $this->storageRepository->putFile(hash('sha256', $officer->id), $image, 'public'),
                'user_id' => $officer->id
            ]);
        }
    }

    protected function generateQrCode (User $officer) {
        $image = QrCode::size(300)->generate(Hash::make($officer->id) . "||" . Hash::make($officer->nip));
        $path = hash('sha256', $officer->id) . '/qrcode/qrcode.png'; 
        $this->storageRepository->put($path, $image, 'public');

        // Pake watermark (Masih Error, Ga bisa diScan)
        // // Generate Qr Code Image
        // $image = QrCode::format('png')->merge('/public/assets/logo/logo.png', 0.35)->size(300)->generate($officer->id);
        // // Langkah 1: Menulis string gambar ke file sementara
        // $tempFilePath = sys_get_temp_dir() . '/' . uniqid() . '.png';
        // // Langkah 2: Convert ke UploadedFile
        // file_put_contents($tempFilePath, $image);
        // $uploadedFile = new UploadedFile($tempFilePath, 'qrcode.png', 'image/png', null, true);
        // // Langkah 3: Upload ke Storage
        // $path = $this->storageRepository->putFile(hash('sha256', $officer->id) . '/qrcode', $uploadedFile, 'public');
        // // Langkah 4: Hapus file sementara
        // unlink($tempFilePath);
        
        return $path;
    }
}
