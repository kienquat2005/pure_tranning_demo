import { AnimatedSprite, Container, Point, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class Player extends Container{
    constructor(){
        super();
        this.textures = [
            Texture.from("/assets/images/player1.png"),
            Texture.from("/assets/images/player2.png"),
            // Texture.from("/assets/images/player.png")
        ];
        this.velocity = new Point(GameConstant.PLAYER_VELOCITY_X, GameConstant.PLAYER_VELOCITY_Y);
        this.speedTab = GameConstant.PLAYER_SPEEDTAB; 
        this.gravity = GameConstant.PLAYER_GRAVITY;

        this.createPlayer();
        document.addEventListener("keydown", ( ) => {
            this.flap();
        })
    //     this.dirction();
    }
    createPlayer(){
        this.playerAnimation = new AnimatedSprite(this.textures);
        this.playerAnimation.animationSpeed = 0.15 ;
        this.playerAnimation.loop = true;
        this.playerAnimation.anchor.set(0.5);
        this.addChild(this.playerAnimation);
        this.playerAnimation.play();
        this.playerAnimation.scale.x = 0.5;
        this.playerAnimation.scale.y = 0.5;
    }

    move(dt){
        this.x += this.velocity.x * dt;
        this.velocity.y += this.gravity;
        this.y += this.velocity.y * dt;
    }

    flap(){
        if(this.velocity.y + GameConstant.PLAYER_SPEEDTAB > GameConstant.PLAYER_VMAX){
            this.velocity.y += -GameConstant.PLAYER_SPEEDTAB;
            this.y -= this.velocity.y;
            // this.rotate(this.velocity - this.tmpAngle, this.x);
        }
        // this.y += this.velocity;
    }
    
}