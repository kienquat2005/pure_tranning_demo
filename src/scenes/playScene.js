import { Container } from "pixi.js";
import { GameConstant } from "../gameconstant";
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
    this.timeout = 1000;
  }

  _initBackGround(){
    this.bg = new BackGround();
    this.addChild(this.bg);
  }


  _initMap() {
    this.map = new Map();
    this.addChild(this.map);
  }

  _initBase(){
    this.base = new Base();
    this.addChild(this.base);
  }

  _initPlayer(){
    this.player = new Player();
    this.addChild(this.player);
  }

  playerColliderWithSpike(){
    if(this.player.isdie){
      return;
    }
    this.map.spikes.forEach((spike)=>{
      if(CollisionDetector.detectCollision(this.player,spike)){
        this.player.onDie();
        this.map.mapVelocity = 0;
      }
    })
  }

  playerColliderWithPlatform(){
    this.map.platForm.forEach((platform)=>{
      if(CollisionDetector.detectCollision(this.player,platform)){
        this.player.graviti = 0;

        // this.player.isCollideWithPlatform = true;
      }
    })
  }

  playerColliderWithSquare(){
    this.map.squares.forEach((square)=>{
      if(CollisionDetector.detectCollision(this.player.player,square)){
        if(this.player.player.y >= square.y - square.height / 2 ) {
            this.map.mapVelocity = 0;
        }
        else { 
          this.player.graviti = 0;
          this.player.isFalling = false;
        }
      } else {
        this.player.graviti = 6;

      }



    })
  }

  playerColliderWithSawblade(){
    this.map.sawblade.forEach((sawblade)=>{
      if(CollisionDetector.detectCollision(this.player,sawblade)){
        this.map.mapVelocity = 0;
      }
    })
  }

  playerColliderWithCrusher(){
    this.map.crushers.forEach((crusher)=>{
      if(CollisionDetector.detectCollision(this.player,crusher)){
        if(this.player.player.y >= crusher.y ){
          this.map.mapVelocity = 0;
        }
        else{
          this.player.player.y -= this.player.jumpVelocity;
        }
      }
    })
  }

  playerColliderWithRectangle(){
    this.map.rectangles.forEach((rectangle)=>{
      if(CollisionDetector.detectCollision(this.player,rectangle)){

      }
    })
  }
  reloadGame(){
    location.reload()
  }

  update(){
    this.map.update();
    this.playerColliderWithPlatform();
    // this.playerColliderWithCrusher();
    // this.playerColliderWithSpike();
    // this.playerColliderWithSquare();
    // this.playerColliderWithSawblade();
    // this.playerColliderWithCrusher();
    this.player.update();

  }
  
  pause(){
    this.map.pause();
  }

  resume(){
    this.map.resume();
    }
}