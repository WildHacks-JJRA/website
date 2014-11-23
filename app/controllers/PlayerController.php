<?php

class PlayerController extends BaseController {

  public function getClick()
  {
    return Cache::has("click")?Cache::get("click"):"fail";
  }

  public function setClick()
  {
    $x = Input::get('x');
    $y = Input::get('y');

    Cache::forever("click", array("x" => $x, "y" => $y, 'timestamp' => time()));
    return array("success");
  }

  public function getDamage()
  {
    return Cache::has("hp")?Cache::get("hp"):array("fail");
  }

  public function setDamage($hp)
  {
    Cache::forever("hp", $hp);
    return array("success");
  }

  public function setMaze()
  {
    $maze = array(
      "size"  => 10,
      "rmaze" => array(
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      ),
      "dmaze" => array(
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
      )
    );

    Cache::forever("maze", $maze);
    return array("success");
  }

  public function getMaze()
  {
    return Cache::has("maze")?Cache::get("maze"):array("fail");
  }
}
