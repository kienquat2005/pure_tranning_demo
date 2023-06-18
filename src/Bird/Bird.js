import { Container, Sprite, Texture } from "pixi.js";

export class Bird extends Container{
    constructor(){
        super();
        this.createBird();
        this.direction();
        this.velocity = 3;
        this.speedFlap = 60;
    }
    createBird(){
        this.bird = new Sprite(Texture.from("/assets/images/bluebird-downflap.png"))
        this.addChild(this.bird);
}

    direction(){
        document.addEventListener("keydown",() => this.flap())
    }

    flap(){
        this.y -= this.speedFlap; 
    }
}