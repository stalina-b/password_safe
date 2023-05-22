<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Http\Resources\PasswordResource;
use App\Models\Password;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PasswordController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PasswordResource::collection(Password::all());
    }

    public function store(PasswordRequest $request): PasswordResource
    {
        $password = Password::create([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
        ]);

        return PasswordResource::make($password);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
