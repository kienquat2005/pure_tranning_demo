import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";

export class Bird extends Container{
    constructor(x, y ){
        super();
        this.x = x;
        this.y = y;
        this.speedFlap = -8 ;
        this.gravity = 0.25;
        this.velocity = 1;
        this.isFalling = false;
        this.vMax = -10;
        this.tmpAngle = 20;

        this.Textures = [
            Texture.from("/assets/images/bluebird-upflap.png"),
            Texture.from("/assets/images/bluebird-midflap.png"),
            Texture.from("/assets/images/bluebird-downflap.png")
        ]; 
        this.createBirdAnimation();
        this.direction();
    }
    createBirdAnimation(){
        this.birdAnimation = new AnimatedSprite(this.Textures)
        this.birdAnimation.animationSpeed = 0.15;
        this.birdAnimation.loop = true;
        this.addChild(this.birdAnimation);
        this.birdAnimation.play();
    }

    direction(){
        document.addEventListener("keydown",() => {
            this.isFalling = true;
            this.flap();
        })
    }

    flap(){
        if(this.velocity + this.speedFlap > this.vMax){
            this.velocity += this.speedFlap;
            this.y -= this.velocity;
            this.rotate(this.velocity - this.tmpAngle, this.x);
        }
    }

    rotate(y, x){
        let angle = Math.atan2(y, x);
        this.rotation = angle;
    }

}