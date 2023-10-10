import { Container } from "pixi.js";
import { BackGround } from "../objects/backGround/background";
import { Map } from "../objects/maps/map";
import { Player } from "../objects/player/player";
import { CollisionDetector } from "../physics/collisionDetector/collisionDetector";

export class PlayScene extends Container{
  constructor(){
    super();
    this._initBackGround();
    this._initMap();
    this._initPlayer();
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
    this.player.y = 500;
  }

  playerColliderWithSpike(){
    if(this.player.isdie){
      return;
    }
    this.map.spikes.forEach((spike)=>{
      if(CollisionDetector.detectCollision(this.player,spike)){
        this.player.ondie();
        this.map.mapVelocity = 0;
      }
    })
  }

  playerColliderWithPlatform(){

    if(this.player.y >= 575) {
      this.player.isFalling = false;
    } else {
      this.player.isFalling = true;
    }
  }

  playerColliderWithSquare(){
    this.map.squares.forEach((square)=>{
      if(CollisionDetector.detectCollision(this.player,square)){
        if(this.player.y <= square.y) {
          this.player.isFalling = false;
        }else {
          this.map.mapVelocity = 0;
        }
      } 
    });
  }

  playerColliderWithCrusher(){
    this.map.crushers.forEach((crusher)=>{
      if(CollisionDetector.detectCollision(this.player,crusher)){
        if(this.player.y <= crusher.y){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0;
        }
      }
    })
  }

  playerColliderWithRectTangle(){
    this.map.rectangles.forEach((rectangle)=>{
      if(CollisionDetector.detectCollision(this.player,rectangle)){
        if(this.player.y <= rectangle.y){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0
        }
      }
    })
  }

 
  reloadGame(){
    location.reload()
  }

  update(){
    this.map.update();
    this.playerColliderWithPlatform();
    // this.playerColliderWithSpike();
    // this.playerColliderWithSquare();
    this.playerColliderWithCrusher()
    this.playerColliderWithRectTangle();
    this.player.update();


  }
  
  pause(){
    this.map.pause();
  }

  resume(){
    this.map.resume();
    }
}