import { Container, Sprite, Texture } from "pixi.js";

export class Ball extends Container{
    constructor(){
        super();
        this.ball();
    }
    ball(){
        this.ball = new Sprite(Texture.from("/assets/images/ball.png"));
        this.addChild(this.ball);
    }
}