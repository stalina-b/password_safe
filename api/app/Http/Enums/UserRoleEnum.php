<?php

namespace App\Http\Enums;

enum UserRoleEnum:string
{
    case ADMIN = 'admin';
    case USER = 'user';
    case PREMIUM = 'premium';
}
