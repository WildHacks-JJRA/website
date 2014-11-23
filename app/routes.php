<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@getPlay');
Route::get('/game', 'HomeController@getGame');
Route::get('/win', 'HomeController@getWin');
Route::get('/lose', 'HomeController@getLose');

Route::get('/maze', 'PlayerController@setMaze');

Route::group(array('prefix' => 'api'), function()
{
  Route::get("all", 'HomeController@getAll');
  Route::get("clear", 'HomeController@clearGame');

  Route::get("maze", "PlayerController@getMaze");
  Route::post("maze", "PlayerController@setMaze");

  Route::get('bomb', 'BombController@getBombPos');
  Route::post('bomb', 'BombController@setBombPos');

  Route::get('click', 'PlayerController@getClick');
  Route::post('click', 'PlayerController@setClick');

  Route::get('damage', 'PlayerController@getDamage');
  Route::post('damage', 'PlayerController@setDamage');
});
