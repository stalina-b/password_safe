<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordItemStoreRequest;
use App\Http\Requests\PasswordItemUpdateRequest;
use App\Http\Requests\PasswordItemIndexRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use Illuminate\Http\JsonResponse;
use Domain\Password\PasswordEncrypter;
use Illuminate\Support\Facades\Hash;

class PasswordItemController extends Controller
{
    public function index(PasswordItemIndexRequest $request): JsonResponse
    {
        return new JsonResponse([
            'data' => PasswordItemResource::collection(PasswordItem::all()),
        ]);
    }

    public function store(PasswordItemStoreRequest $request): JsonResponse
    {
        if (! Hash::check($request->input('master_password'), $request->user()->password)) {
            return new JsonResponse([
                'error' => 'Master password does not match with user password.',
            ], 403);
        }

        $encryptedPassword = PasswordEncrypter::encrypt(
            $request->input('password'),
            $request->input('master_password'),
        );

        $password = PasswordItem::create([
            'title' => $request->input('title'),
            'user_id' => $request->user()->id,
            'password' => $encryptedPassword,
        ]);

        return new JsonResponse([
            'data' => PasswordItemResource::make($password),
        ]);
    }

    public function show(PasswordItem $passwordItem): JsonResponse
    {
        return new JsonResponse([
            'data' => PasswordItemResource::make($passwordItem),
        ]);
    }

    public function update(PasswordItemUpdateRequest $request, PasswordItem $passwordItem): JsonResponse
    {
        $passwordItem->update([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
        ]);

        return new JsonResponse([
            'data' => PasswordItemResource::make($passwordItem),
        ]);
    }

    public function destroy(PasswordItem $passwordItem): JsonResponse
    {
        return new JsonResponse([
            'data' => $passwordItem->delete(),
        ]);
    }
}
