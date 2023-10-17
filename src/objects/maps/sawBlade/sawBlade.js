import { Container, Sprite, Texture } from "pixi.js";

export class SawBlade extends Container{
    constructor(){
        super();
        this.sprite = new Sprite(Texture.from("/assets/images/sawblade.png"));
        this.addChild(this.sprite)
    }
}