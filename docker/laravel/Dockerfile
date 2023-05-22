FROM php:8.2

COPY ./api /api

WORKDIR /api

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install
RUN php artisan key:generate

CMD [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=80" ]
