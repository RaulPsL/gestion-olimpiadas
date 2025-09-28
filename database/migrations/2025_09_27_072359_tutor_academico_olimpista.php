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
        Schema::create('tutor_academico_olimpistas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('olimpista_id')->constrained()->onDelete('cascade');
            $table->foreignId('tutor_academico_id')->nullable()->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor_academico_olimpistas');
    }
};
