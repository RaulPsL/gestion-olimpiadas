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
        Schema::create('usuario_fases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained()->onDelete('cascade');
            $table->foreignId('fase_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            // $table->unique(['usuario_id','fase_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_fases');
    }
};
