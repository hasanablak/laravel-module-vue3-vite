<?php

use Illuminate\Support\Facades\Route;
use Nwidart\Modules\Facades\Module;

Route::get('/', function () {
	return redirect()->route('admin.dashboard');
});

Route::get('/admin', function () {
	$modules = Module::all();


	return view('admin.dashboard', [
		"modules" => $modules
	]);
})->name('admin.dashboard');
