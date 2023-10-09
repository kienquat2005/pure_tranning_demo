import { Container, Sprite, Texture } from "pixi.js";
import { Effect } from "../../effect/effec";
import { GameConstant } from "../../gameconstant";
import { CollisionDetector } from "../../physics/collisionDetector/collisionDetector";

export class Player extends Container{
    constructor(){
        super();
        this.isJumping = false;
        this.isFalling = false;
        this.jumpVelocity = 10;
        this.graviti = 6;
        this.groundY = 525;
        this.rotationSpeed = 0.156;
        this.balanceSpeed = 0.1;
        this.degree = 0;
        this.isdie = false;
        this._initPlayer();
        this._initEffect();
        this.registerEvent(); 
        this.isCollideWithPlatform = false;

    }
    _initPlayer(){
        this.player = new Sprite(Texture.from("/assets/images/player.png"));
        this.addChild(this.player);
        this.player.x = 200;
        this.player.y = 200;
        // this.player.scale.x = 1.5;
        // this.player.scale.y = 1.5;
        this.player.width = 50;
        this.player.height = 50;
        this.player.anchor.set(0.5)
    }
    _initEffect(){
        this.effect = new Effect();
        this.addChild(this.effect);
        this.effect.x = this.player.x - 25;
        this.effect.y = this.player.y
        // this.effect.play();
      }

    onDie(){
        this.isdie = true;
    }

    jump(){
        if(!this.isJumping && !this.isFalling){
            this.isJumping = true;
            this.jumpVelocity = 10;
            // this.effect.stop();
        }
    }

    fall(){
        // this.graviti = 6;
        this.player.y += this.graviti;
        this.player.y = this.groundY;
        this.isFalling = false;
        this.player.rotation = this.degreesToRadians(this.degree);
        // this.effect.play();
    }
   
    updatePlayer(){
        if(!this.isJumping) {
            this.player.y += this.graviti;
        } else {
            this.player.y -= this.jumpVelocity;
            this.jumpVelocity -= 0.5;
            this.player.rotation += this.rotationSpeed;
            if(this.jumpVelocity <= 0) {
                this.isFalling = true;
            }
        }


        // if(this.isJumping){
        //     this.player.rotation += this.rotationSpeed;
        //     this.player.y -= this.jumpVelocity;
        //     this.jumpVelocity -= 0.5;;
        //     // this.effect.x = this.player.x - 35 ;
        //     // this.effect.y = this.player.y;
        //     // this.effect.stop(); 
        //     // if(this.jumpVelocity <=0){
        //     //     this.isJumping = false;
        //     //     this.isFalling = true;
        //     // }
        // }
        // if(this.isFalling){
        //     // this.effect.x = this.player.x - 35 ;
        //     // this.effect.y = this.player.y;
        //     this.fall();
            
        // } 
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

                // this.fall();
            }
        });
    }
    update(){
        // this.player.y += this.drop;
        this.updatePlayer();
    }

}