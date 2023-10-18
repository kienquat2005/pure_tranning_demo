import { Container } from "pixi.js";
import { BackGround } from "../objects/backGround/background";
import { Map } from "../objects/maps/map";
import { Player } from "../objects/player/player";

export class PlayScene extends Container{
  constructor(){
    super();
    this._initBackGround();
    this._initMap();
    this._initPlayer();
    this.isColl = false;
    this.enable = false;
  }

  _initBackGround(){
    this.bg = new BackGround();
    this.addChild(this.bg);
  }


  _initMap() {
    this.map = new Map();
    this.addChild(this.map);
  }

  _initPlayer(){
    this.player = new Player();
    this.addChild(this.player);
    this.player.x = 300
    this.player.y = 525;
  }


  playerColliderWithPlatform(){
    this.enable = false;
    if(this.player.sprite.y >= 575) {
      this.player.isFalling = false; 
    } else {
      this.player.fall();
    }
  }

  
  // reloadGame(){
  //   setTimeout(() => {
  //     location.reload()
  //   }, 2000);
  // }

  update(){
    this.map.update();
    this.playerColliderWithPlatform(); 
    this.player.update();
  }
  
  pause(){
    this.map.pause();
  }

  resume(){
    this.map.resume();
    }
}