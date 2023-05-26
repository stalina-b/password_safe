<?php

namespace App\Http\Controllers;

use App\Http\Enums\UserRoleEnum;
use App\Http\Resources\UserResource;
use App\Models\PasswordItem;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function showUsers(): JsonResponse
    {
        return new JsonResponse([
            'data' => UserResource::collection(User::all()),
        ]);
    }

    public function roleStatistics(): JsonResponse
    {
        $free = User::query()->where('role', UserRoleEnum::USER)->count();
        $premium = User::query()->where('role', UserRoleEnum::PREMIUM)->count();

        return new JsonResponse([
            'data' => [
                'free' => $free,
                'premium' => $premium,
            ],
        ]);
    }

    public function usageStatistics(): JsonResponse
    {
        $users = User::query()
            ->selectRaw('
                DATE_FORMAT(created_at, "%Y-%m-%d") AS date,
                COUNT(*) as users
            ')
            ->limit(31)
            ->groupBy('date')
            ->get();

        $passwords = PasswordItem::query()
            ->selectRaw('
                DATE_FORMAT(created_at, "%Y-%m-%d") AS date,
                COUNT(*) as passwords
            ')
            ->limit(31)
            ->groupBy('date')
            ->get();

        return new JsonResponse([
            'data' => [
                'users' => $users,
                'passwords' => $passwords,
            ],
        ]);
    }
}