import { Container } from "pixi.js";
import { Background } from "../background/background";
import { GameConstant } from "../gameconstant";
import { Player, PlayerEvent } from "../player/player";
import { Spikes } from "../spikes/spikes";
import { Game } from "../game";
import { Score } from "../score/score";
import { CollisionDetector } from "../collisionDetector/collisionDetector";
import { LevelData } from "../level/levelData";
import { candy } from "../candy/candy";
import { Youloss } from "../youLoss/loss";
import { ScoreCandy } from "../score/socrecandy";

export class PlayScene extends Container{
    constructor(){
        super();
        this.initBackground();
        this.initScore();
        this.initPlayer();
        this.initSpikes();
        this.initCandy();
        this.ShowGameOverScreen();
        this.initScoreCandy();
    }
    initPlayer(){
        this.player = new Player();
        this.addChild(this.player);
        this.player.x = GameConstant.GAME_WIDTH/2 -20;
        this.player.y = GameConstant.GAME_HEIGHT/2;
        this.player.on(PlayerEvent.LOSE, ()=> {
            this.loss.visible = true;
        });
    }

    initBackground(){
        this.background = new Background();
        this.addChild(this.background);
    }
    
    initSpikes(){
        this.spikes = new Spikes();
        this.addChild(this.spikes)
        this.spikes.x = 100;
    }

    initCandy(){
        this.candy = new candy();
        this.addChild(this.candy);
        this.candy.x = 100;
        this.candy.y = GameConstant.GAME_HEIGHT/2;

    }

    initScore(){
        this.score = new Score();
        this.addChild(this.score);
        this.score.x = GameConstant.GAME_WIDTH/2;
        this.score.y = GameConstant.GAME_HEIGHT/2;
    }

    initScoreCandy(){
        this.scorecandy = new ScoreCandy();
        // this.scorecandy.x = this.candy.x
        this.addChild(this.scorecandy);
        // this.scorecandy.visible = false;

    }

    ShowGameOverScreen(){
        this.loss = new Youloss()
        this.loss.visible = false;
        this.addChild(this.loss);
    }

    updateScore(){
        if(this.player.isDied){
            return;
        }
        this.score.score += GameConstant.SCORE_STEP;
        this.score.scoreText.text = this.score.score;
        LevelData.nextLevell(this.score.score);
    }

    playerColliderWallRight(){
        if(this.player.x >= this.background.width - this.player.width / 2 ){
            this.player.velocity.x = -this.player.velocity.x;
            this.player.scale.x = -this.player.scale.x;
            if(this.player.isDied){
                return;
            }
            this.spikes.spikeLefts.forEach((spikelefts)=>{
                spikelefts.tweenShow.start(Game.currentTime );
            });
            this.spikes.spikeRights.forEach((spkr)=>{
                spkr.tweenHide.start(Game.currentTime);
            });
            
            this.updateScore();
            this.spikes.ramdomShowSpikeLeft();
        }
    }

    playerColliderWallLeft(){
        if(this.player.x <= 0 - this.player.width / 2 ){
            this.player.velocity.x = - this.player.velocity.x;
            this.player.scale.x = - this.player.scale .x;
            if(this.player.isDied){
                return;
            }
            this.spikes.spikeLefts.forEach((spikelefts)=>{
                spikelefts.tweenHide.start(Game.currentTime );
            });
            this.spikes.spikeRights.forEach((spkr)=>{
                spkr.tweenShow.start(Game.currentTime);
            });
            this.updateScore();
            this.spikes.ramdomShowSpikeRight();
        }
    }
     
    playerColliderWithSpikeUp(){
        this.spikes.spikeup.forEach((spikesup)=>{
            if(CollisionDetector.detectCollision(this.player,spikesup)){
                if(!this.player.isDied){
                    this.player.onDie();
                    this.player.onDieWhenTop();
                    // this.player.playerRotation();
                }
            }
        });
    }

    playerColliderWithSpikeDow(){
        this.spikes.spikedow.forEach((spikesdow)=>{
            if(CollisionDetector.detectCollision(this.player,spikesdow)){
                if(!this.player.isLose){
                    this.player.onDie();
                    this.player.onDieWhenBot();
                }
            }
        })
    }

    playcolliderWithSpikeLeft(){
        this.spikes.spikeLefts.forEach((spikesleft)=>{
            if(!spikesleft.visible){
                return;
            }
            if(CollisionDetector.detectCollision(this.player,spikesleft)){
                if(!this.player.isDied){
                    this.player.onDie();
                    this.player.onDieWhenLeft();
                }
            }
        })
    }

    playcolliderWithSpikeRight(){
        this.spikes.spikeRights.forEach((spikesRight)=>{
            if(!spikesRight.visible){
                return;
            }
            if(CollisionDetector.detectCollision(this.player,spikesRight)){
                if(!this.player.isDied){
                    this.player.onDie();
                    this.player.onDieWhenRight();
                }
            }
        })
    }

    playColliderWiltCandy(){
        if(this.player.isDied){
            return;
        }

        if(CollisionDetector.detectCollision(this.player,this.candy)){
            this.candy.isleft = !this.candy.isleft;
            if(this.candy.isleft){
                this.candy.x = 600;
                this.candy.y = this.candy.randomCandy();
            }
            else {
                this.candy.x = 100;
                this.candy.y = this.candy.randomCandy();
            }
        }
    }
    
    update(dt){
        if(this.player.isDied) {
            this.player.playRotation();
            this.player.changeSkinPlayer();
        }
        this.player.move(dt);
        this.playColliderWiltCandy();
        this.playcolliderWithSpikeRight();
        this.playcolliderWithSpikeLeft();
        this.playerColliderWithSpikeDow();
        this.playerColliderWithSpikeUp();
        this.playerColliderWallRight();
        this.playerColliderWallLeft(); 
    }
}