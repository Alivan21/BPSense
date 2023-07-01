<?php

namespace App\Providers;

use App\Repositories\Admin\Officer\OfficerRepositoryInterface;
use App\Repositories\Admin\OfficerImage\OfficerImageRepository;
use App\Repositories\Admin\OfficerImage\OfficerImageRepositoryInterface;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Role\RoleRepositoryInterface;
use App\Repositories\User\OfficerRepository;
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
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class,
            OfficerRepositoryInterface::class,
            OfficerRepository::class,
            OfficerImageRepository::class,
            OfficerImageRepositoryInterface::class,
            RoleRepository::class,
            RoleRepositoryInterface::class
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
