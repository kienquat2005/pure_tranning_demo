import { Container } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { BackGround } from "../objects/backGround/background";
import { Base } from "../objects/base/base";
import { Player } from "../objects/player/player";

export class PlayScene extends Container{
  constructor(){
    super();
    this._initBackGround();
    this._initBase();
    this._initPlayer();
  }

  _initBackGround(){
    this.bg = new BackGround();
    this.addChild(this.bg);
  }

  _initBase(){
    this.base = new Base();
    this.addChild(this.base);
  }

  _initPlayer(){
    this.player = new Player();
    this.addChild(this.player);
  }

  update(){
    this.base.update();
    this.player.update();
  }
}