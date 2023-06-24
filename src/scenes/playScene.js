import { Container } from "pixi.js";
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
  UpdateScore : "updateScore"
})

export class PlayScene extends Container {
  constructor(){
    super();
    this.state = null;
    this._initBackground();
    this._initPipe();
    this._initBase();
    this._initScore();
    this._initBird();
    this._initGameLose();
  }

  _initBackground(){
    this.background = new Backgroud();
    this.addChild(this.background);
  }

  _initBase(){
    this.base = new Base();
    this.addChild(this.base);
  }

  _initBird(){
    this.bird = new Bird();
    this.addChild(this.bird);
    this.bird.x = GameConstant.GAME_WIDTH / 2 - 20;
    this.bird.y = GameConstant.GAME_HEIGHT / 2 - 50;
  }

  _initPipe(){
    this.pipe = new Pipe();
    this.addChild(this.pipe);
    this.pipe.x = 300
  }

  _initGameLose(){
    this.gameLose = new Youlose();
    this.addChild(this.gameLose);
    this.gameLose.visible = false;
  }

  _initScore(){
    this.score = new Score();
    this.addChild(this.score);
  }

  birdFalling(){
    this.bird.y += this.bird.velocity;
  }

  _baseAnimation(){
    this.base.bases.forEach((base) => {
      base.x -= this.base.velocity;
      if(base.x <= -300){
        base.x = 300;
      }
    })
  }

  onCollideWithBase(){
    this.bird.velocity = 0;
    this.pipe.velocity = 0;
    this.base.velocity = 0;
    this.gameLose.visible = true;
  }

  onCollideWithPipe(){
    this.bird.velocity = 10;
    this.bird.speedFlap = 0;
    this.pipe.velocity = 0;
    this.base.velocity = 0;
  }



  getRamdom(){
    let random = Math.floor(Math.random() * 151) - 150 ;
    return random;
  }

  update(){
    this.pipe.x -= this.pipe.velocity;
    if(this.pipe.x <= -60 ){
      this.pipe.x = 300;
    }
    this._baseAnimation();
    this.birdFalling();
    
    

    if(CollisionDetector.detectCollision(this.bird, this.pipe.pipeDown) 
      || CollisionDetector.detectCollision(this.bird, this.pipe.pipeUp)){
          if(this.state === gameState.GameOver){
            return;
          }
          this.state = gameState.GameOver;
          this.onCollideWithPipe();
    }

    if(CollisionDetector.detectCollision(this.bird, this.base)){
      this.onCollideWithBase();
    }

    if(this.pipe.x < this.bird.x - 50){
      if(this.state === gameState.UpdateScore){
        return;
      }
      this.state = gameState.UpdateScore;
      this.score.score += 1;  
      this.score.scoreText.text = "Score: " + this.score.score;
    }
    else{
      if(this.state === gameState.Playing){
        return;
      }
      this.state = gameState.Playing;
    }
    
  }
}