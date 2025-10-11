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
        Schema::create('verificacion_cierres', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_encargado_id');
            $table->foreign('usuario_encargado_id')
                ->references('id')
                ->on('usuarios')
                ->onDelete('cascade');
            $table->unsignedBigInteger('usuario_evaluador_id');
            $table->foreign('usuario_evaluador_id')
                ->references('id')
                ->on('usuarios')
                ->onDelete('cascade');
            $table->foreignId('fase_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verificacion_cierres');
    }
};
