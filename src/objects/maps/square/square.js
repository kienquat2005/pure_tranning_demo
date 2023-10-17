import { Container, Sprite, Texture } from "pixi.js";

export class Square extends Container{
    constructor(){
        super();

        this.square = new Sprite(Texture.from("/assets/images/square.png"));
        this.addChild(this.square);
    }
}