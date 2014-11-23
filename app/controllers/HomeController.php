<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		return View::make('hello');
	}

	public function getPlay()
	{
		return View::make('home');
	}

	public function getGame()
	{
		return View::make('game');
	}

	public function getWin()
	{
		return View::make('win');
	}

	public function getLose()
	{
		return View::make('lose');
	}

	public function getAll()
	{
		return array(
      "bomb" 	=> Cache::has('bomb') ? Cache::get('bomb') : "fail",
      "click" => Cache::has("click")? Cache::get("click"): "fail",
      "hp"		=> Cache::has("hp")? Cache::get("hp") : "fail",
    );
	}

	public function clearGame()
	{
		Cache::forget("bomb");
		Cache::forget("click");
		Cache::forget("hp");

		return array("success");
	}

}
