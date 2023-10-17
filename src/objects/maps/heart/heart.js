import { Container, Sprite, Texture } from "pixi.js";

export class Heart extends Container{
    constructor(){
        super()
        this.heart = new Sprite(Texture.from("/assets/images/heart.png"));
        this.addChild(this.heart)
        this.heart.anchor.set(0.5)
    }
}