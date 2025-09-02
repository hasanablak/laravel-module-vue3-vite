<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tighten\Ziggy\Ziggy;

Route::get('ziggy', fn () => response()->json(new Ziggy));


Route::get('/user', function (Request $request) {
	return $request->user();
})->middleware('auth:sanctum');
