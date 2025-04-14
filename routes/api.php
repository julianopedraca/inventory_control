<?php

use App\Http\Controllers\Api\V1\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::apiResource('products', ProductController::class);
});
