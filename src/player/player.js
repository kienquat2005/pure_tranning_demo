import { AnimatedSprite, Container, Point, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { Tween } from '@tweenjs/tween.js';
export const PlayerEvent = Object.freeze({
    LOSE: "lose",
});
export class Player extends Container{
    constructor(){
        super();
        this.textures = [
            Texture.from("/assets/images/player1.png"),
            Texture.from("/assets/images/player2.png"),
            // Texture.from("/assets/images/player.png")
        ];
        this.textureDie = Texture.from("/assets/images/playerDie.png");
        this.playerRotate = GameConstant.PLAYER_ROTAE;
        this.velocity = new Point(GameConstant.PLAYER_VELOCITY_X, GameConstant.PLAYER_VELOCITY_Y);
        this.jumpForce = GameConstant.PLAYER_JUMP_FORCE; 
        this.gravity = GameConstant.PLAYER_GRAVITY;
        this.isDied = false;
        this.isLose = false;
        this.isFalling = false;
        this.vMax = new Point(GameConstant.PLAYER_VX_MAX, GameConstant.PLAYER_VY_MAX);
        this.createPlayer();
        this._initTweenCountDie();
        document.addEventListener("keydown", () => {
            if(this.isDied){
                return;
            }
            this.flap();
        });
    }

    _initTweenCountDie(){
        this.tweenCount = new Tween({t: 1}).to({t: 0}).duration(1000).onUpdate((alpha)=>{
            this.alpha = alpha.t;
        }).onComplete(()=> {
            this.isLose = true;
            this.emit(PlayerEvent.LOSE);
        });
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

    changeSkinPlayer() {
        this.playerAnimation.texture = this.textureDie;
    }

    onDie(){
        this.isDied = true;
    }

    onDieWhenLeft(){
        this.velocity.x = -10;

        console.log(this.velocity.x);
    }

    onDieWhenRight(){
        this.velocity.x = 10;
        console.log(this.velocity.x)
    }

    onDieWhenTop(){
        this.velocity.y = 30;
    }

    onDieWhenBot(){
        this.tweenCount.start();
        // neu toc do di chuyen "x" cua player lon hon toc do toi da thi cho toc do player = toc do toi da
        if(Math.abs(this.velocity.x) > this.vMax.x){
            if(this.velocity.x < 0){
                this.velocity.x = -this.vMax.x;
            } else {
                this.velocity.x = this.vMax.x;
            }
        }else {
            this.velocity.x = this.velocity.x * 1.5;
        }

        // neu toc do di chuyen "y" cua player lon hon toc do toi da thi cho toc do player = toc do toi da
        if(this.velocity.y + this.jumpForce > this.vMax.y){
            this.velocity.y += this.jumpForce;
        } else {
            this.velocity.y = this.vMax.y;
        }
        }

    playRotation(){
        this.rotation += this.playerRotate;
    }

    move(dt){
        this.x += this.velocity.x * dt;
        this.velocity.y += this.gravity * dt;
        this.y += this.velocity.y;
    }

    flap(){
        if(this.velocity.y + this.jumpForce > this.vMax.y){
            this.velocity.y += this.jumpForce;
        } else {
            this.velocity.y = this.vMax.y;
        }
        this.y -= this.velocity.y;
    }
}