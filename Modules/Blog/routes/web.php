<?php

use Illuminate\Support\Facades\Route;
use Modules\Blog\Http\Controllers\BlogController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(["prefix" => "blog"], function () {

	Route::resource('/', BlogController::class)->parameters(["" => "blog"])->names('blog');
    #Route::resource('blog', BlogController::class)->names('blog');

});