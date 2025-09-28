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
        Schema::create('calificacions', function (Blueprint $table) {
            $table->id();
            $table->decimal('puntaje', 5, 2);
            $table->string('comentarios');
            $table->foreignId('olimpista_id')->constrained()->onDelete('cascade');
            $table->foreignId('fase_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            // $table->unique(['olimpista_id', 'fase_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificacions');
    }
};
