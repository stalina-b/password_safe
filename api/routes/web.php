<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('routes', function() {
    $routeCollection = Route::getRoutes();
    foreach ($routeCollection as $value) {
        echo "Route: ";
        echo $value->uri();
        echo "<br/>";
    }
});
