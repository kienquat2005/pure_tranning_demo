import { Container, Sprite, Texture } from "pixi.js";
import { Effect } from "../../effect/effec";
import { GameConstant } from "../../gameconstant";

export class Player extends Container{
    constructor(){
        super();
        this.speedFlap = 50;
        this.isJumping = false;
        this.isFalling = false;
        this.jumpVelocity = 10;
        this.graviti = 0.5;
        this.groundY = 525;
        this.rotationSpeed = 0.156;
        this.balanceSpeed = 0.1;
        this.degree = 0;
        this.isdie = false;
        this._initPlayer();
        this._initEffect();
        this.registerEvent(); 

    }
    _initPlayer(){
        this.player = new Sprite(Texture.from("/assets/images/player.png"));
        this.addChild(this.player);
        this.player.x = 200;
        this.player.y = 525;
        this.player.scale.x = 1.5;
        this.player.scale.y = 1.5;
        this.player.anchor.set(0.5)
    }
    _initEffect(){
        this.effect = new Effect();
        this.addChild(this.effect);
        this.effect.x = this.player.x - 25;
        this.effect.y = this.player.y
        this.effect.play();
      }

    onDie(){
        this.isdie = true;
    }

    jump(){
        if(!this.isJumping && !this.isFalling){
            this.isJumping = true;
            this.jumpVelocity = 10;
            // this.effect.stop();
            // console.log( this.effect.y)
            
        }
    }

    fall(){
        if(!this.isJumping && this.player.y < this.groundY ){
            this.isFalling = true; 
            // this.effect.play();
        }
    }
   
    updatePlayer(){
        if(this.isJumping){
            this.player.rotation += this.rotationSpeed
            this.player.y -= this.jumpVelocity;
            this.jumpVelocity -= this.graviti;
            this.effect.x = this.player.x - 35 ;
            this.effect.y = this.player.y;
            this.effect.stop();
            if(this.jumpVelocity <=0){
                this.isJumping = false;
                this.isFalling = true;
            }
        }
        if(this.isFalling){
            this.effect.x = this.player.x - 35 ;
            this.effect.y = this.player.y;
            this.player.y += this.jumpVelocity;
            this.jumpVelocity += this.graviti;
            if(this.player.y >= this.groundY){
                this.player.y = this.groundY;
                this.isFalling = false;
                this.player.rotation = this.degreesToRadians(this.degree);
                this.effect.play();
            }
        } 
    }

    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }
      
    
    registerEvent(){
        document.addEventListener("keydown",(e)=>{
            if(e.code === "Space"){
                if(this.isFalling){
                    return;   
                }
                this.degree += 180 ;
                this.jump();
                this.fall();
                // console.log(this.degree)
            }
        })
    }
    update(){
        this.updatePlayer();
    }

}