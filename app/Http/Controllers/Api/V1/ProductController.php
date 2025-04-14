<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'quantity' => 'required|integer|min:0',
                'price' => 'required|numeric|min:0',
                'category' => 'required|string|max:100',
                'sku' => 'required|string|unique:products,sku',
            ]);

            $product = Product::create($validated);
            return response()->json($product, 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|nullable|string',
                'quantity' => 'sometimes|integer|min:0',
                'price' => 'sometimes|numeric|min:0',
                'category' => 'sometimes|string|max:100',
                'sku' => 'sometimes|string|unique:products,sku,' . $product->id,
            ]);

            $product->update($validated);
            return Inertia::render('dashboard');
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    }

    public function destroy(Product $product)
    {
        if (Gate::allows('manage-products')) {
            $product->delete();
            return response()->json(null, 204);
        }

        return response()->json(['error' => 'Forbidden'], 403);
    }
}
