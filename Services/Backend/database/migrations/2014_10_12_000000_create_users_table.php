<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            // $table->uuid('id')->primary();
            $table->id();
            $table->string('name');
            $table->string('nip')->unique()->nullable();
            $table->string('username')->unique()->nullable();
            $table->boolean('status')->default(false);
            $table->string('email')->unique()->nullable();
            $table->string('phone', 15)->unique()->nullable();
            $table->date('birth_date')->nullable();
            $table->string('qrcode')->unique()->nullable();
            $table->string('profile')->unique()->nullable();
            $table->string('password');
            $table->unsignedBigInteger('role_id')->nullable();
            $table->foreign('role_id')->references('id')->on('users')->nullOnDelete();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
