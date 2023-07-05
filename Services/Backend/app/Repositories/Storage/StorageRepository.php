<?php
namespace App\Repositories\Storage;

use Illuminate\Support\Facades\Storage;

class StorageRepository implements StorageRepositoryInterface
{
    public function put(string $path, $file, string $visibility = 'public') {
        return Storage::put($path, $file, $visibility);
    }

    public function putFile(string $path, $file, string $visibility = 'public') {
        return Storage::putFile($path, $file, $visibility);
    }

    public function delete(string $path) {
        return Storage::delete($path);
    }
}