import { Container } from "pixi.js";
import { Background } from "../background/background";
import { GameConstant } from "../gameconstant";
import { Player } from "../player/player";

export class PlayScene extends Container{
    constructor(){
        super();
        this.initBackground();
        this.initPlayer();
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

    playerColliderWallRight(){
        if(this.player.x >=  this.background.width - this.player.width / 2 || this.player.x + this.player.width / 2 <= 0 ){
            this.player.velocity.x = -this.player.velocity.x;
            this.player.scale.x = -this.player.scale.x;
        }
    }

    update(dt){
        this.player.move(dt)
        this.playerColliderWallRight();
    }
}