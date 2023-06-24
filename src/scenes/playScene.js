import { Container, copySearchParams } from "pixi.js";
import { Backgroud } from "../Backgroud/Backgroud";
import { Base } from "../Base/Base";
import { Bird } from "../Bird/Bird";
import { CollisionDetector } from "../collisionDetector/collisionDetector";
import { GameConstant } from "../gameConstant";
import { Pipe } from "../pipes/pipe";
import { Score } from "../score/score";
import { Youlose } from "../youLose/youLose";

export const gameState = Object.freeze({
  Playing : "playing",
  GameOver : "gameOver",
  UpdateScore : "updateScore",
})

export class PlayScene extends Container {
  constructor(){
    super();
    this.state = null;
    this.createBackgroud();
    this.createBird();
    this.createPipe();
    this.createBase();
    this.createYoulose();
    this.createScore();
    
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
  createScore(){
    this.score = new Score();
    this.addChild(this.score);
  }

  updateScore(){
    this.score.score +=1;
    this.score.scoreText.text = "Score "+this.score.score;
  }

  createYoulose(){
    this.lose = new Youlose();
    this.addChild(this.lose);
    this.lose.visible = false;
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
      if(this.state === gameState.GameOver){
        return;
      }
      this.state = gameState.GameOver;
      console.log(this.state)

      this.onBirdCollidePipedow();
    }
    if(CollisionDetector.detectCollision(this.bird, this.pipe.pipeUp)){
      if(this.state === gameState.GameOver){
        return;
      }
      this.state = gameState.GameOver;
      this.onBirdCollidePipeup();
    }

    if(this.pipe.x <= this.bird.x){
      if(this.state === gameState.UpdateScore){
        return;
      }
      this.state = gameState.UpdateScore;
      this.updateScore(); 

    }else{
      this.state = gameState.Playing;
    }
  }


  pipeCollilewithwall(){
      if(this.pipe.x <= -50 ){
        this.pipe.x = 300;
        this.pipe.y = this.getRamdom();
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
     this.lose.visible = true;
     document.addEventListener("keydown", (e) => {
      if(e.key === "w"){
        location.reload();
      }
     })
  }

  onBirdCollidePipeup(){
    this.pipe.velocity = 0;
    this.base.velocity = 0; 
  }
  onBirdCollidePipedow(){
    this.pipe.velocity = 0;
    this.base.velocity = 0;
  }
  getRamdom(){
    let random = Math.floor(Math.random() * 151) - 150 ;
      return random;
  }
  

}