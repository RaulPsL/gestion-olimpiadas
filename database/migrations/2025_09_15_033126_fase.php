<?php

use App\Models\Traits\Casts\EstadoFase;
use App\Models\Traits\Casts\TipoFase;
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
        Schema::create('fases', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo_fase', array_column(TipoFase::cases(), 'value'))->default('preliminales');
            $table->string('sigla');
            $table->text('descripcion')->nullable();
            $table->integer('cantidad_max_participantes');
            $table->integer('cantidad_min_participantes');
            $table->enum('estado', array_column(EstadoFase::cases(), 'value'))->default('pendiente');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->foreignId('area_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fases');
    }
};
