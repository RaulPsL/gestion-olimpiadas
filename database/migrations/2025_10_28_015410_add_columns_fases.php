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
        Schema::table('fases', function (Blueprint $table) {
            $table->integer('cantidad_ganadores')->nullable();
            $table->foreignId('nivel_id')->nullable()->constrained()->onDelete('cascade');
            $table->dateTime('fecha_calificacion')->nullable();
            $table->foreignId('fase_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fases', function (Blueprint $table) {
            //
        });
    }
};
