import { Container, Sprite, Texture } from "pixi.js";

export class Destination extends Container{
    constructor(){
        super()
        this.destination = new Sprite(Texture.from("/assets/images/destination.png"));
        this.addChild(this.destination);
    }
}