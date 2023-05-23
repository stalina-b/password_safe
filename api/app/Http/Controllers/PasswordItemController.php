<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Http\Resources\PasswordItemResource;
use App\Models\PasswordItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PasswordItemController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PasswordItemResource::collection(PasswordItem::all());
    }

    public function store(PasswordRequest $request): PasswordItemResource
    {
        $password = PasswordItem::create([
            'title' => $request->input('title'),
            'password' => $request->input('password'),
        ]);

        return PasswordItemResource::make($password);
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
