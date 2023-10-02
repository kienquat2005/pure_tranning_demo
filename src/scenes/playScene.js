import { Container } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { BackGround } from "../objects/background";
import { Base } from "../objects/base";

export class PlayScene extends Container{
  constructor(){
    super();
    this._initBackGround();
    this._initBase();
  }

  _initBackGround(){
    this.bg = new BackGround();
    this.addChild(this.bg);
  }

  _initBase(){
    this.base = new Base();
    this.addChild(this.base);
  }

  update(){
  }
}