<?php

namespace App\Providers;

use App\Repositories\OfficerImage\OfficerImageRepository;
use App\Repositories\OfficerImage\OfficerImageRepositoryInterface;
use App\Repositories\Officer\OfficerRepository;
use App\Repositories\Officer\OfficerRepositoryInterface;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Role\RoleRepositoryInterface;
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

        /**
         * User
         * @var UserRepositoryInterface
         * @var UserRepository
         */
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        /**
         * Officer
         * @var OfficerRepositoryInterface
         * @var OfficerRepository
         */
        $this->app->bind(
            OfficerRepositoryInterface::class,
            OfficerRepository::class

        );

        /**
         * Officer Image
         * @var OfficerImageRepositoryInterface
         * @var OfficerImageRepository
         */
        $this->app->bind(
            OfficerImageRepositoryInterface::class,
            OfficerImageRepository::class

        );

        /**
         * Role
         * @var RoleRepositoryInterface
         * @var RoleRepository
         */
        $this->app->bind(
            RoleRepositoryInterface::class,
            RoleRepository::class,

        );

        /**
         *  Officer
         * @var OfficerRepositoryInterface
         * @var OfficerRepository
         */
        $this->app->bind(
            'App\Repositories\Admin\Officer\OfficerRepositoryInterface',
            'App\Repositories\Admin\Officer\OfficerRepository',

        );

        /**
         *  Storage
         * @var StorageRepositoryInterface
         * @var StorageRepository
         */
        $this->app->bind(
            StorageRepositoryInterface::class,
            StorageRepository::class,

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
