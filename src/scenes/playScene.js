import { Container } from "pixi.js";
import { BackGround } from "../objects/backGround/background";
import { Map } from "../objects/maps/map";
import { Player } from "../objects/player/player";
import { CollideEvents, CollisionDetector } from "../physics/collisionDetector/collisionDetector";

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
    // this.player.x = 300
    // this.player.y = 525;
  }

  playerColliderWithSpike(){
    if(this.player.isdie){
      return;
    }
    this.map.spikes.forEach((spike)=>{
      if(CollisionDetector.detectCollision(this.player.sprite ,spike)){
        this.player.ondie();
        this.map.mapVelocity = 0;
        this.reloadGame();
      }
    })
  }
  

  playerColliderWithPlatform(){
    this.enable = false;
    if(this.player.sprite.y >= 575) {
      this.player.isFalling = false; 
    } else {
      this.player.fall();
    }
  }

  playerColliderWithSquare(){
    if(this.player.isdie){
      return;
    }
    this.map.squares.forEach((square)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,square)){
        if(this.player.sprite.y <= square.y) {
          this.player.isFalling = false;
        }else {
          this.map.mapVelocity = 0;
          this.player.ondie();
          this.reloadGame();
        }
      }
    });

    
  }

  playerColliderWithSawBlade(){
    if(this.player.isdie){
      return; 
    }
    this,this.map.sawblade.forEach((sawblade)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,sawblade)){
        this.map.mapVelocity = 0;
        this.player.ondie();
        this.reloadGame(); 
      }
    })
  }

  playerColliderWithCrusher(){
    if(this.player.isdie){
      return;
    }
    this.map.crushers.forEach((crusher)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,crusher)){
        if(this.player.sprite.y <= crusher.y){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0;
          this.player.ondie();
          this.reloadGame();
        }
      }
    });
  }

  playerColliderWithRectTangle(){
    if(this.player.isdie){
      return;
    }
    this.map.rectangles.forEach((rectangle)=>{
      if(CollisionDetector.detectCollision(this.player.sprite,rectangle)){
        if(this.player.sprite.y <= rectangle.y){
          this.player.isFalling = false;
        }
        else{
          this.map.mapVelocity = 0
          this.player.ondie();
          this.reloadGame();
        }
      }
    })
  }

  reloadGame(){
    setTimeout(() => {
      location.reload()
    }, 2000);
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