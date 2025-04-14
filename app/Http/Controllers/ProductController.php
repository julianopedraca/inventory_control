<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'quantity' => $product->quantity,
                'price' => $product->price,
                'category' => $product->category,
                'sku' => $product->sku,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return Inertia::render('product', [
            'products' => $products,
        ]);
    }
}
