import { Container, Sprite, Texture } from "pixi.js";

export class CruSher extends Container{
    constructor(){
        super();
        this.cruSher = new Sprite(Texture.from("/assets/images/crusher.png"));
        this.addChild(this.cruSher)
    }
}