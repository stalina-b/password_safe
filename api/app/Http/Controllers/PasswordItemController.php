<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordItemStoreRequest;
use App\Http\Requests\PasswordItemUpdateRequest;
use App\Http\Requests\PasswordItemShowRequest;
use App\Http\Requests\PasswordItemIndexRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use Illuminate\Http\JsonResponse;
use Domain\Password\PasswordEncrypter;
use Domain\Password\PasswordIdentical;
use Illuminate\Support\Facades\Hash;

class PasswordItemController extends Controller
{
    public function index(PasswordItemIndexRequest $request): JsonResponse
    {

        return new JsonResponse([
            'data' => $request->user()->passwordItems()->paginate(
                $perPage = $request->input('perPage') ?? 15,
            ),
        ]);
    }

    public function store(PasswordItemStoreRequest $request): JsonResponse
    {
        $masterPassword = base64_decode($request->input('master_password'));

        $encryptedPassword = PasswordEncrypter::encrypt(
            $request->input('password'),
            $masterPassword,
        );

        $password = PasswordItem::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'username' => $request->input('username'),
            'password' => $encryptedPassword,
        ]);

        return new JsonResponse([
            'data' => PasswordItemResource::make($password),
        ]);
    }

    public function show(PasswordItemShowRequest $request, PasswordItem $passwordItem): JsonResponse
    {
        $masterPassword = base64_decode($request->input('master_password'));

        $passwordItemResource = PasswordItemResource::make($passwordItem);
        $passwordItemResource['password'] = PasswordEncrypter::decrypt($passwordItem->password, $masterPassword);

        return new JsonResponse([
            'data' => PasswordItemResource::make($passwordItemResource),
        ]);
    }

    public function update(PasswordItemUpdateRequest $request, PasswordItem $passwordItem): JsonResponse
    {
        $masterPassword = base64_decode($request->input('master_password'));

        $encryptedPassword = PasswordEncrypter::encrypt(
            $request->input('password'),
            $masterPassword,
        );
        $passwordItem->update([
            'title' => $request->input('title'),
            'username' => $request->input('username'),
            'password' => $encryptedPassword,
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
