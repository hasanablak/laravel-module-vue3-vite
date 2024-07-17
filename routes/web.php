<?php

use Illuminate\Support\Facades\Route;
use Nwidart\Modules\Facades\Module;

Route::get('/', function () {
	return redirect()->route('admin.dashboard');
})->name('home');

Route::get('/admin', function () {
	$modules = Module::all();


	return view('admin.dashboard', [
		"modules" => $modules
	]);
})->name('admin.dashboard');

Route::get('/redirect', fn () => (redirect()->route('admin.dashboard')))->name('');
