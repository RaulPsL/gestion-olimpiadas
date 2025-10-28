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
        Schema::table('olimpistas', function (Blueprint $table) {
            $table->integer('ci')->unique();
            $table->integer('celular');
            $table->foreignId('grado_id')->constrained()->onDelete('cascade');
            $table->dropColumn('codigo_sis');
            $table->dropColumn('semestre');
            $table->string('email');
            $table->date('fecha_nacimiento');
            $table->foreignId('colegio_id')->constrained()->onDelete('cascade');
            $table->foreignId('tutor_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
