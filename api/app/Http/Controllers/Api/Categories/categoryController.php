<?php

namespace App\Http\Controllers\Api\Categories;

use App\Http\Controllers\Controller;
use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class categoryController extends Controller
{
    public function newCategory(Request $request)
    {
        try {
            $validateCategory = Validator::make($request->all(),
                [
                    'name' => 'required',
                ]);
            if($validateCategory->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateCategory->errors()->first()
                ], 401);
            }
            // get user email
            $user = auth()->user();
            $category = category::create([
                'name' => $request->name,
                'email'=> $user->email,
            ]);
            // find the category
            return response()->json([
                'status' => true,
                'message' => 'Category Created Successfully',
                'category' => category::find($category->id),
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    // list all categories
    public function index()
    {
        try {
            $categories = category::all()->where('email', auth()->user()->email);
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
        try {
            $category = category::find($id)->where('email', auth()->user()->email);
            if(!$category){
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
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    // update category
    public function update(Request $request, $id)
    {
        try {
            $category = category::find($id)->where('email', auth()->user()->email);
            if(!$category){
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
}
