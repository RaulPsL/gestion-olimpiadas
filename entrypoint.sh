#!/bin/bash

# Esperar a que PostgreSQL esté listo
echo "Esperando a que PostgreSQL esté disponible..."
until php artisan migrate:status 2>/dev/null; do
    echo "PostgreSQL no está listo - esperando..."
    sleep 2
done

echo "PostgreSQL está listo!"

# Ejecutar migraciones
echo "Ejecutando migraciones..."
php artisan migrate --force

# Ejecutar seeders (opcional, comentar si no quieres que se ejecute siempre)
echo "Ejecutando seeders..."
php artisan db:seed --force

# Iniciar el servidor
echo "Iniciando servidor Laravel..."
php artisan serve --host=0.0.0.0 --port=8000