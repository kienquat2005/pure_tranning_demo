import { Container } from "pixi.js";
import { Backgroud } from "../Backgroud/Backgroud";
import { Base } from "../Base/Base";
import { Bird } from "../Bird/Bird";
import { CollisionDetector } from "../collisionDetector/collisionDetector";
import { GameConstant } from "../gameConstant";
import { Pipe } from "../pipes/pipe";

import { Youlose } from "../youLose/youLose";

export class PlayScene extends Container {
  constructor(){
    super();
    this.createBackgroud();
    this.createBird();
    this.createPipe();
    this.createBase();
    this.createYoulose();

    
  }

  createBackgroud(){
    this.backgroud = new Backgroud();
    this.addChild(this.backgroud);
  }

  createPipe(){
    this.pipe = new Pipe();
    this.addChild(this.pipe);
    this.pipe.x = 300
    this.pipe.x = GameConstant.GAME_WIDTH;
    
  }

  createBird(){
    this.bird = new Bird();
    this.addChild(this.bird);
    this.bird.x = 100;
    this.bird.y = 100;

  }

  createBase(){
    this.base = new Base();
    this.addChild(this.base);
    this.bases = this.base.bases
  }
 

  createYoulose(){
    this.lose = new Youlose();
  }


  update(){
    this.bird.y += this.bird.velocity; 
    this.pipe.x -= this.pipe.velocity;
    this.pipeCollilewithwall();
    this.baseCollilewithWall();

    if(this.bird.y >= 379){
      this.bird.speedFlap = 0;
    }

   if(CollisionDetector.detectCollision(this.bird, this.base)){
    this.onBirdCollidebase();
   }

    if(CollisionDetector.detectCollision(this.bird, this.pipe.pipeDOw)){
      this.onBirdCollidePipedow();
    }
    if(CollisionDetector.detectCollision(this.bird, this.pipe.pipeUp)){
      this.onBirdCollidePipeup();
    }
    
  }


  pipeCollilewithwall(){
      if(this.pipe.x <= -50 ){
        this.pipe.x = 300;
        this.pipe.y = this.getRamdom();
        console.log(this.getRamdom())
      }
  }
  baseCollilewithWall(){
    this.bases.forEach((base) => {
      base.x -= this.base.velocity;
      if(base.x <= -288){
        base.x = 300
      }
    })
    
    }
  onBirdCollidebase(){
     this.bird.velocity = 0;
     this.base.velocity = 0;
     this.pipe.velocity = 0;
     this.addChild(this.lose);
     document.addEventListener("keydown", (e) => {
      if(e.key === "w"){
        location.reload();
      }
     })
  }

  onBirdCollidePipeup(){
    this.pipe.velocity = 0;
    this.base.velocity = 0; 
    this.addChild(this.lose);
  }
  onBirdCollidePipedow(){
    this.pipe.velocity = 0;
    this.base.velocity = 0;
    this.addChild(this.lose);
  }
  getRamdom(){
    let random = Math.floor(Math.random() * 151) - 150 ;
      return random;
  }
  

}