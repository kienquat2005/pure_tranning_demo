import { Container } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { BackGround } from "../objects/backGround/background";
import { Base } from "../objects/base/base";
import { Spike } from "../objects/obstacle/spike";
import { Player } from "../objects/player/player";
import { CollisionDetector } from "../physics/collisionDetector/collisionDetector";

export class PlayScene extends Container{
  constructor(){
    super();
    this._initBackGround();
    this._initBase();
    this._initPlayer();
    this._initSpike();
    this.timeout = 1000;
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

  _initSpike(){
    this.spike = new Spike()
    this.addChild(this.spike);
    
  }

  playerColliderWithSpke(){
    if(this.player.isdie){
      return;
    }
    if(CollisionDetector.detectCollision(this.player,this.spike)){
      this.player.onDie();
      this.base.basevelocity = 0;
      this.spike.spkeVelocity = 0;
      setTimeout(() => {
        this.reloadGame()
      }, this.timeout);
    }
  }
  reloadGame(){
    location.reload()
  }

  update(){
    this.base.update();
    this.player.update();
    this.spike.update();
    // this.playerColliderWithSpke();
  }
}