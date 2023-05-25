<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\FilterRequest;
use App\Models\PasswordItem;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

class FilterController extends Controller
{
    public function filter(FilterRequest $request)
    {

        $passwords = PasswordItem::where('title', 'like', '%' . $request->input('search') . '%')
            ->orWhere('username', 'like', '%' . $request->input('search') . '%')
            ->orderBy($request->input('orderBy') ?? 'title', $request->boolean('desc') ? 'desc' : 'asc')
            ->paginate($perPage = $request->input('perPage') ?? 15);

        $categories = Category::where('name', 'like', '%' . $request->input('search') . '%')
            ->orderBy($request->input('orderBy') ?? 'name', $request->boolean('desc') ? 'desc' : 'asc')
            ->paginate($perPage = $request->input('perPage') ?? 15);

        return new JsonResponse([
            'passwords' => $passwords,
            'categories' => $categories,
        ]);
    }
}
