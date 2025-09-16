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
        Schema::create('rol_menu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rol_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['rol_id','menu_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rol_menu');
    }
};
