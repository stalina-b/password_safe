FROM php:8.2-fpm-alpine3.17

COPY ./api /api

WORKDIR /api

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apk add git
RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql
RUN composer install
RUN php artisan key:generate

CMD [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=80" ]
