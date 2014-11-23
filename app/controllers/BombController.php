<?php

class BombController extends BaseController {

  public function setBombPos($x, $y)
  {
    Cache::forever("bomb", array($x, $y));
    return array("success");
  }

  public function getBombPos()
  {
    return Cache::has('bomb') ? Cache::get('bomb') : array("fail");
  }
}
