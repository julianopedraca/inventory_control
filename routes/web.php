<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/produtos', [ProductController::class, 'index'])->name('produtos');

    Route::get('/produtos/editar', function () {
        return Inertia::render('dashboard.edit');
    })->name('produtos/editar');

    Route::get('/produtos/adicionar', function () {
        return Inertia::render('dashboard.add');
    })->name('produtos/adicionar');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
