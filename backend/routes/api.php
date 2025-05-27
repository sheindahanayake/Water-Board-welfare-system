<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController; // <-- Add this line

// Public routes
Route::post('/register', [AuthController::class, 'register']); // User registration
Route::post('/login', [AuthController::class, 'login']); // User login
Route::get('/products', [ProductController::class, 'index']); // Fetch all products
Route::get('/products/{product}', [ProductController::class, 'show']); // Fetch a single product by ID

// Event public routes (optional: allow public to view events)
Route::get('/events', [EventController::class, 'index']); // List all events
Route::get('/events/{event}', [EventController::class, 'show']); // View a single event

// Gallery public routes
Route::get('/galleries', [GalleryController::class, 'index']); // List all gallery items
Route::get('/galleries/{gallery}', [GalleryController::class, 'show']); // View a single gallery item

// Allow event and gallery creation, update, and delete for authenticated admins
Route::middleware('auth:sanctum')->group(function () {
    // Authentication routes
    Route::post('/logout', [AuthController::class, 'logout']); // User logout
    Route::get('/auth/me', [AuthController::class, 'me']); // Fetch authenticated user details
    Route::get('/user', [AuthController::class, 'user']); // Fetch user details

    // User profile routes
    Route::prefix('user')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']); // Fetch user profile
        Route::put('/profile', [UserController::class, 'updateProfile']); // Update user profile
    });

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/users', [AdminController::class, 'index']); // Fetch all users
        Route::post('/users', [AdminController::class, 'store']); // Create a new user
        Route::put('/users/{user}', [AdminController::class, 'update']); // Update a user
        Route::delete('/users/{user}', [AdminController::class, 'destroy']); // Delete a user
        Route::get('/orders', [OrderController::class, 'index']); // Fetch all orders for admin
        Route::delete('/orders/{order}', [OrderController::class, 'destroy']); // Delete an order (ADMIN)

        // Member management routes for admin
        Route::get('/members', [MemberController::class, 'index']); // List all members
        Route::post('/members', [MemberController::class, 'store']); // Add a new member
        Route::get('/members/{member}', [MemberController::class, 'show']); // View a member
        Route::put('/members/{member}', [MemberController::class, 'update']); // Update a member
        Route::delete('/members/{member}', [MemberController::class, 'destroy']); // Delete a member
    });

    // Event management routes (for authenticated users, e.g. admin)
    Route::post('/events', [EventController::class, 'store']); // Add event
    Route::put('/events/{event}', [EventController::class, 'update']); // Update event
    Route::delete('/events/{event}', [EventController::class, 'destroy']); // Delete event

    // Gallery management routes (for authenticated users, e.g. admin)
    Route::post('/galleries', [GalleryController::class, 'store']); // Add gallery item
    Route::delete('/galleries/{gallery}', [GalleryController::class, 'destroy']); // Delete gallery item

    // Supplier routes
    Route::prefix('supplier')->group(function () {
        Route::get('/products', [ProductController::class, 'supplierProducts']); // Supplier-specific products
        Route::get('/products/{product}', [ProductController::class, 'show']); // Fetch a single product by ID
        Route::post('/products', [ProductController::class, 'store']); // Add a new product
        Route::put('/products/{product}', [ProductController::class, 'update']); // Update a product
        Route::delete('/products/{product}', [ProductController::class, 'destroy']); // Delete a product
        Route::post('/clear-cart', [CartController::class, 'clearCartBySupplier']); // Clear cart by supplier
    });

    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']); // View cart items
        Route::post('/add', [CartController::class, 'addItem']); // Add item to cart
        Route::put('/items/{item}', [CartController::class, 'updateItem']); // Update cart item
        Route::delete('/items/{item}', [CartController::class, 'removeItem']); // Remove cart item
        Route::delete('/', [CartController::class, 'clearCart']); // Clear entire cart
    });

    // Order routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']); // View all orders
        Route::get('/{order}', [OrderController::class, 'show']); // View a specific order
        Route::post('/', [OrderController::class, 'store']); // Place a new order
        Route::put('/{order}/status', [OrderController::class, 'updateStatus']); // Update order status
    });
});