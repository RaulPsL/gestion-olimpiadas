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
        Schema::create('calificacion_grupos', function (Blueprint $table) {
            $table->id();
            $table->decimal('puntaje', 5, 2);
            $table->string('comentarios');
            $table->foreignId('grupo_id')->constrained()->onDelete('cascade');
            $table->foreignId('fase_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['grupo_id', 'fase_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificacion_grupos');
    }
};
