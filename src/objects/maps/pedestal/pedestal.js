import { Container, Sprite, Texture } from "pixi.js";
export class Pedestal extends Container{
    constructor(){
        super()
        this.sprite = new Sprite(Texture.from("/assets/images/pedestal.png"));
        this.addChild(this.sprite)
    }
}