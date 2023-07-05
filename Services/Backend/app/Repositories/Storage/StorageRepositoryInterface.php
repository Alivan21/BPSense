<?php

namespace App\Repositories\Storage;

interface StorageRepositoryInterface
{
    public function putFile(string $path, $file, string $visibility = 'public');

    public function delete(string $path);
}
