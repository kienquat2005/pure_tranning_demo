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
    // this.player.x = 300
    // this.player.y = 525;
  }

  playerColliderWithSpike(){
    if(this.player.isdie){
      return;
    }
    this.map.spikes.forEach((spike)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,spike)){
        this.player.ondie();
        this.map.mapVelocity = 0;
        this.reloadGame();
      }
    })
  }
  

  playerColliderWithPlatform(){
    if(this.player.sprite.y >= 575) {
      this.player.isFalling = false;
    } else {
      this.player.fall();
    }
  }

  playerColliderWithSquare(){
    this.map.squares.forEach((square)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,square)){
        if(this.player.sprite.y <= square.y) {
          this.player.isFalling = false;
        }else {
          this.map.mapVelocity = 0;
          this.player.ondie();
        }
      } 
    });
  }

  playerColliderWithSawBlade(){
    this,this.map.sawblade.forEach((sawblade)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,sawblade)){
        this.map.mapVelocity = 0;
        this.player.ondie();
      }
    })
  }

  playerColliderWithCrusher(){
    this.map.crushers.forEach((crusher)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,crusher)){
        if(this.player.sprite.y <= crusher.y + crusher.height / 2 ){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0;
          this.player.ondie()
        }
      }
    })
  }

  playerColliderWithRectTangle(){
    this.map.rectangles.forEach((rectangle)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,rectangle)){
        if(this.player.sprite.y <= rectangle.y + rectangle.height/2 + this.player.height/2){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0
          // this.player.on()
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
    this.playerColliderWithSpike();
    this.playerColliderWithSquare();
    this.playerColliderWithSawBlade(); 
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