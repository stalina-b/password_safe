<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordItemStoreRequest;
use App\Http\Requests\PasswordItemUpdateRequest;
use App\Http\Requests\PasswordItemShowRequest;
use App\Http\Requests\PasswordItemIndexRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Domain\Password\PasswordEncrypter;
use Illuminate\Support\Facades\Hash;

class PasswordItemController extends Controller
{
    public function index(PasswordItemIndexRequest $request): JsonResponse
    {
        return new JsonResponse([
            'data' => PasswordItem::paginate(
                $perPage = $request->input('perPage') ?? 15,
            ),
        ]);
    }

    public function store(PasswordItemStoreRequest $request): JsonResponse
    {
        $masterPassword = base64_decode($request->input('master_password'));

        if (! Hash::check($masterPassword, $request->user()->password)) {
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
            'category_id' => $request->input('category_id'),
            'password' => $encryptedPassword,
        ]);

        return new JsonResponse([
            'data' => PasswordItemResource::make($password),
        ]);
    }

    public function show(PasswordItemShowRequest $request, PasswordItem $passwordItem): JsonResponse
    {
        $masterPassword = base64_decode($request->input('master_password'));

        if (! Hash::check($masterPassword, $request->user()->password)) {
            return new JsonResponse([
                'error' => 'Master password does not match with user password.',
            ], 403);
        }

        $passwordItemResource = PasswordItemResource::make($passwordItem);
        $passwordItemResource['password'] = PasswordEncrypter::decrypt($passwordItem->password, $masterPassword);

        return new JsonResponse([
            'data' => PasswordItemResource::make($passwordItemResource),
        ]);
    }

    public function update(PasswordItemUpdateRequest $request, PasswordItem $passwordItem): JsonResponse
    {
        $passwordItem->update([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
            'category_id' => $request->input('category_id'),
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
