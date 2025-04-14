<?php

use App\Http\Controllers\Api\V1\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;

Route::prefix('api/v1')->group(function () {
    Route::post('products', [ProductController::class, 'store'])->middleware(CheckRole::class);
    //     Route::put('products/{product}', [ProductController::class, 'update']);
    //     Route::delete('products/{product}', [ProductController::class, 'destroy']);

    // Route::middleware('role:admin,operator')->group(function () {
    //     Route::patch('products/{product}/stock', [ProductController::class, 'updateStock']);
    // });
});
