<?php

namespace App\Http\Controllers\Api;

use App\Http\Enums\UserRoleEnum;
use App\Models\category;
use App\Models\PasswordItem;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateUserRequest;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]
            );
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()->first()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => UserRoleEnum::USER,
                'password' => Hash::make($request->password)
            ]);
            // create a new test category
            $category = category::create([
                'name' => 'test',
                'user_id' => $user->id,
            ]);
            // create a new test password item
            $passwordItem = PasswordItem::create([
                'user_id' => $user->id,
                'title' => 'test',
                'master_password' => base64_encode($request->password),
                'name' => 'test',
                'username' => 'test@test.com',
                'password' => '7jHUYe22313qdw}YeqN|%',
                'note' => 'test note',
                'category_id' => $category->id,
            ]);
            // find the user
            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'user' => User::find($user->id),
                'passwordItem' => $passwordItem,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()->first()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'errors' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // premium user upgrade
    public function upgrade(Request $request)
    {
        try {
            $user = Auth::user();
            $user->role = UserRoleEnum::PREMIUM;
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'User Upgraded Successfully',
                'user' => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
