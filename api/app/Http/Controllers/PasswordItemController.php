<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordItemStoreRequest;
use App\Http\Requests\PasswordItemUpdateRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Domain\Password\PasswordEncrypter;

class PasswordItemController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PasswordItemResource::collection(PasswordItem::all());
    }

    public function store(PasswordItemStoreRequest $request): JsonResponse
    {
        /* return new JsonResponse((new PasswordEncrypter)->key); */
        $test = PasswordEncrypter::encrypt('my_new_password', 'password');
        /* return new JsonResponse($test); */
        return new JsonResponse(PasswordEncrypter::decrypt($test, 'password'));

        $password = PasswordItem::create([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
        ]);

        return PasswordItemResource::make($password);
    }

    public function show(PasswordItem $passwordItem): PasswordItemResource
    {
        return PasswordItemResource::make($passwordItem);
    }

    public function update(PasswordItemUpdateRequest $request, PasswordItem $passwordItem): PasswordItemResource
    {
        $passwordItem->update([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
        ]);

        return PasswordItemResource::make($passwordItem);
    }

    public function destroy(PasswordItem $passwordItem): bool
    {
        return $passwordItem->delete();
    }
}
