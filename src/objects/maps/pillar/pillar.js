import { Container, Sprite, Texture } from "pixi.js";

export class Pillar extends Container{
    constructor(){
        super()
        this.sprite = new Sprite(Texture.from("/assets/images/pillar.png"));
        this.addChild(this.sprite);
    }
}