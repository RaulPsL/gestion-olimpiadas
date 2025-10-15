FROM dunglas/frankenphp:php8.4-bookworm

ENV SERVER_NAME=":${PORT:-8080}"

RUN install-php-extensions \
    pdo_pgsql \
    bcmath \
    opcache \
    @composer

WORKDIR /app

COPY . .

# Instalar dependencias PHP
RUN composer install \
  --ignore-platform-reqs \
  --optimize-autoloader \
  --prefer-dist \
  --no-interaction \
  --no-progress

# Construir assets de Vite (React + ShadCN)
RUN apt-get update && apt-get install -y nodejs npm \
  && npm install \
  && npm run build \
  && rm -rf node_modules

# Generar clave y cachear configuración
RUN php artisan key:generate \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache

CMD php artisan serve --port=8080

EXPOSE 8080
