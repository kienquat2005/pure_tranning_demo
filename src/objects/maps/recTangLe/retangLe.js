import { Container, Sprite, Texture } from "pixi.js";

export class RecTangLe extends Container{
    constructor(){
        super()
        this.sprite = new Sprite(Texture.from("/assets/images/rectangle.png"))
        this.addChild(this.sprite);
    }
}