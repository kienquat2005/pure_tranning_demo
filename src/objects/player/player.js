import { Container, Sprite, Texture } from "pixi.js";
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
        this.rotationSpeed = 0.078;
        this.balanceSpeed = 0.1;
        this.degree = 0;
        this._initPlayer();
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

    jump(){
        if(!this.isJumping && !this.isFalling){
            this.isJumping = true;
            this.jumpVelocity = 10;
        }
    }

    fall(){
        if(!this.isJumping && this.player.y < this.groundY ){
            this.isFalling = true; 
        }
    }
    rotationPlayer(angle){
        this.player.rotation = angle; 
    }
    balancePlayer(targetRotation) {
        const rotationDiff = targetRotation - this.player.rotation;
        const rotationDelta = rotationDiff * this.balanceSpeed;

        this.player.rotation += rotationDelta;
    }

    updatePlayer(){
        if(this.isJumping){
            // this.player.rotation += this.rotationSpeed
            this.player.y -= this.jumpVelocity;
            this.jumpVelocity -= this.graviti;
            if(this.jumpVelocity <=0){
                this.isJumping = false;
                this.isFalling = true;
            }
        }
        if(this.isFalling){
            this.player.y += this.jumpVelocity;
            this.jumpVelocity += this.graviti;
            if(this.player.y >= this.groundY){
                console.log(this.player.rotation)
                this.player.y = this.groundY;
                this.isFalling = false;
                this.player.rotation = this.degreesToRadians(this.degree);
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
                this.degree += 90;
                this.jump();
                this.fall();
            }
        })
    }
    update(){
        this.updatePlayer();
    }

}