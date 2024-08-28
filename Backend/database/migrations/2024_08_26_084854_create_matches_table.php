<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("hostUser");
            $table->foreign("hostUser")->references("id")->on("users");
            $table->unsignedBigInteger("guessUser");
            $table->foreign("guessUser")->references("id")->on("users");
            $table->integer("creditsbetted");
            $table->string("game")->nullable();
            $table->unsignedBigInteger("winner");
            $table->foreign("winner")->references("id")->on("users");
            $table->unsignedBigInteger("loser");
            $table->foreign("loser")->references("id")->on("users");
            $table->string("score")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
