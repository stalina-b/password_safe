<?php

namespace App\Http\Controllers\Api\Categories;

use App\Http\Controllers\Controller;
use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CategoryResource;

class categoryController extends Controller
{
    public function newCategory(Request $request)
    {
        $request->validate([

                'name' => 'required',
        ]);

        // get user email
        $user = auth()->user();
        $category = category::create([
            'name' => $request->name,
            'user_id' => $user->id,
        ]);

        // find the category
        return response()->json([
            'status' => true,
            'message' => 'Category Created Successfully',
            'category' => CategoryResource::make($category),
        ], 200);
    }
    // list all categories
    public function index()
    {
        try {
            $categories = CategoryResource::collection(Auth::user()->categories);
            return response()->json([
                'status' => true,
                'message' => 'Categories Fetched Successfully',
                'categories' => $categories,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    // delete category
    public function delete($id)
    {
        $category = Auth::user()->categories()->findOrFail($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category Not Found',
            ], 404);
        }
        $category->delete();
        return response()->json([
            'status' => true,
            'message' => 'Category Deleted Successfully',
        ], 200);
    }
    // update category
    public function update(Request $request, $id)
    {
        try {
            $category = category::find($id)->where('email', auth()->user()->email);
            if (!$category) {
                return response()->json([
                    'status' => false,
                    'message' => 'Category Not Found',
                ], 404);
            }
            $category->update([
                'name' => $request->name,
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Category Updated Successfully',
                'category' => category::find($category->id),
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // show the category
    public function show(category $category)
    {
        return response()->json([
            'status' => true,
            'message' => 'Category Fetched Successfully',
            'category' => CategoryResource::make($category),
        ], 200);
    }
}
