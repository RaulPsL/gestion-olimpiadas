<?php

use App\Models\Traits\Casts\EstadoOlimpista;
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
        Schema::create('olimpistas', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 15);
            $table->string('apellido_paterno', 15);
            $table->string('apellido_materno', 15);
            $table->integer('codigo_sis');
            $table->integer('semestre');
            $table->enum('estado', array_column(EstadoOlimpista::cases(), 'value'))->default('activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('olimpistas');
    }
};
