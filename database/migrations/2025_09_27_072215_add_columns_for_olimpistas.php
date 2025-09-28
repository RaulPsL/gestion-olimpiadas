<?php

use App\Models\Traits\Casts\GradoOlimpista;
use App\Models\Traits\Casts\NivelArea;
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
            $table->enum('grado_escolar', array_column(GradoOlimpista::cases(), 'value'))->default('primero');
            $table->enum('nivel_escolar', array_column(NivelArea::cases(), 'value'))->default('primaria');
            $table->dropColumn('codigo_sis');
            $table->dropColumn('semestre');
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
