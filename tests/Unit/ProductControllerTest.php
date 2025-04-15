<?php

use App\Http\Controllers\Api\V1\ProductController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

it('can create a product with valid data', function () {
    $request = Request::create('/api/v1/products', 'POST', [
        'name' => 'New Product',
        'description' => 'Product description',
        'quantity' => 10,
        'price' => 99.99,
        'category' => 'electronics',
        'sku' => 'UNIQUE123',
    ]);

    $controller = new ProductController();
    $response = $controller->store($request);

    expect($response->getStatusCode())->toBe(302);
    expect(Product::where('sku', 'UNIQUE123')->exists())->toBeTrue();
});

it('returns 403 when creating product with invalid data', function () {
    $request = Request::create('/api/v1/products', 'POST', [
        'name' => '',
        'quantity' => -1,
    ]);

    $controller = new ProductController();
    $response = $controller->store($request);

    expect($response->getStatusCode())->toBe(403);
    expect($response->getData()->error)->toBe('Forbidden');
});

it('can show a product', function () {
    $product = Product::factory()->create();

    $controller = new ProductController();
    $response = $controller->show($product);

    expect($response->getStatusCode())->toBe(200);
    expect($response->getData()->id)->toBe($product->id);
});

it('can update a product with valid data', function () {
    $product = Product::factory()->create();

    $request = Request::create("/api/v1/products/{$product->id}", 'PUT', [
        'name' => 'Updated Product',
        'price' => 199.99,
    ]);

    $controller = new ProductController();
    $response = $controller->update($request, $product);

    expect($response->getStatusCode())->toBe(302);
    expect($product->fresh()->name)->toBe('Updated Product');
    expect($product->fresh()->price)->toBe(199.99);
});

it('returns 403 when updating with invalid data', function () {
    $product = Product::factory()->create();

    $request = Request::create("/api/v1/products/{$product->id}", 'PUT', [
        'price' => -10, // Invalid: negative price
    ]);

    $controller = new ProductController();
    $response = $controller->update($request, $product);

    expect($response->getStatusCode())->toBe(403);
    expect($response->getData()->error)->toBe('Forbidden');
});

it('can delete a product', function () {
    $product = Product::factory()->create();

    $controller = new ProductController();
    $response = $controller->destroy($product);

    expect($response->getStatusCode())->toBe(302);
    expect(Product::find($product->id))->toBeNull();
});
