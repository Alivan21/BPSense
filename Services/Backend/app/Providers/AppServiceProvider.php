<?php

namespace App\Providers;

use App\Repositories\OfficerImage\OfficerImageRepository;
use App\Repositories\OfficerImage\OfficerImageRepositoryInterface;
use App\Repositories\Officer\OfficerRepository;
use App\Repositories\Officer\OfficerRepositoryInterface;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Role\RoleRepositoryInterface;
use App\Repositories\Admin\Officer\OfficerRepository as AdminOfficerRepository;
use App\Repositories\Admin\Officer\OfficerRepositoryInterface as AdminOfficerRepositoryInterface;
use App\Repositories\Storage\StorageRepository;
use App\Repositories\Storage\StorageRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }

        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class,
            OfficerRepositoryInterface::class,
            OfficerRepository::class,
            OfficerImageRepository::class,
            OfficerImageRepositoryInterface::class,
            RoleRepository::class,
            RoleRepositoryInterface::class,
            AdminOfficerRepository::class,
            AdminOfficerRepositoryInterface::class,
            StorageRepository::class,
            StorageRepositoryInterface::class,
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
