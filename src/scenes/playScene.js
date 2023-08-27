import { Container } from "pixi.js";
import { Ball } from "../objects/ball/ball";

export class PlayScene extends Container{
  constructor(){
    super();
    this._intBall();
  }
  _intBall(){
    this.ball = new Ball();
    this.addChild(this.ball);
  }
}