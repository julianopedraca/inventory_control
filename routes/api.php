<?php

use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckAdminRole;
use App\Http\Middleware\CheckEditorRole;

Route::prefix('api/v1')->group(function () {
    Route::post('products', [ProductController::class, 'store'])->middleware(CheckAdminRole::class);
    Route::put('products/{product}', [ProductController::class, 'update'])->middleware(CheckEditorRole::class);
    Route::delete('products/{product}', [ProductController::class, 'destroy'])->middleware(CheckAdminRole::class);

    Route::post('login', [AuthController::class, 'login']);
});
