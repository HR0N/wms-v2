<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_base', function (Blueprint $table) {
            $table->id();
            $table->string('phone')->unique();
            $table->string('name')->nullable(true);
            $table->string('occupation')->nullable(true);
            $table->string('status');
            $table->text('comment')->nullable(true);
            $table->string('categories')->nullable(true);
            $table->string('date');
            $table->string('user');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_base');
    }
};
