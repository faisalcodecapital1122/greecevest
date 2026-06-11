<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| GREECEVEST Blade Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', function () {
    return view('pages.home');
})->name('home');

// Main Pages
Route::get('/about-us', function () {
    return view('pages.about');
})->name('about');

Route::get('/contact-us', function () {
    return view('pages.contact');
})->name('contact');

// Listings
Route::get('/properties', function () {
    return view('pages.properties');
})->name('properties');

Route::get('/properties/{id}', function ($id) {
    return view('pages.property-detail', ['routeId' => $id]);
})->name('properties.show');

Route::get('/professionals', function () {
    return view('pages.professionals');
})->name('professionals');

// Market Intelligence
Route::get('/investment-map', function () {
    return view('pages.investment-map');
})->name('investment-map');

// Signup alias → register
Route::get('/signup', function () {
    return view('pages.signup');
})->name('signup');

// Legal Pages
Route::get('/privacy-policy', function () {
    return view('pages.privacy-policy');
})->name('privacy-policy');

Route::get('/terms', function () {
    return view('pages.terms');
})->name('terms');

Route::get('/data-protection', function () {
    return view('pages.data-protection');
})->name('data-protection');

/*
|--------------------------------------------------------------------------
| Auth Routes (login/register/logout POST handling)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Dashboard (preserved)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
