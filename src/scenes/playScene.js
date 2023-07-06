import { Container } from "pixi.js";
import { Background } from "../background/background";
import { GameConstant } from "../gameconstant";
import { Player } from "../player/player";
import { Spikes } from "../spikes/spikes";
import { Tween } from '@tweenjs/tween.js';
import { Game } from "../game";

export class PlayScene extends Container{
    constructor(){
        super();
        this.initBackground();
        this.initPlayer();
        this.initSpikes();
    }
    initPlayer(){
        this.player = new Player();
        this.addChild(this.player);
        this.player.x = GameConstant.GAME_WIDTH/2 -20 ;
        this.player.y = GameConstant.GAME_HEIGHT/2 ;
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

    playerColliderWallRight(){
        if(this.player.x >=  this.background.width - this.player.width / 2  ){
            this.player.velocity.x = -this.player.velocity.x;
            this.player.scale.x = -this.player.scale.x;
            this.spikes.spikeLefts.forEach((spikelefts)=>{
                spikelefts.tweenShow.start(Game.currentTime);
            });
            this.spikes.spikeRights.forEach((spkr)=>{
                spkr.tweenHide.start(Game.currentTime);
            });
        }
    }
    playerColliderWallLeft(){
        if(this.player.x <= 0 - this.player.width / 2 ){
            this.player.velocity.x = - this.player.velocity.x;
            this.player.scale.x = - this.player.scale .x;
            this.spikes.spikeLefts.forEach((spikelefts)=>{
                spikelefts.tweenHide.start(Game.currentTime);
            });
            this.spikes.spikeRights.forEach((spkr)=>{
                spkr.tweenShow.start(Game.currentTime);
            });
        }
    }

    update(dt){
        this.player.move(dt)
        this.playerColliderWallRight();
        this.playerColliderWallLeft(); 
    }
}