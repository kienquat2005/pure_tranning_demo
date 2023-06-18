import { Container, Sprite, Texture } from "pixi.js";

export class Backgroud extends Container{
    constructor(){
        super();
        this.createBackgroud();
    }
    createBackgroud(){
        this.backgroud = new Sprite(Texture.from("/assets/images/background-day.png"));
        this.addChild(this.backgroud);
    }
}