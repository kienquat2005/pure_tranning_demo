import { Container, Sprite, Texture } from "pixi.js";

export class Door extends Container{
    constructor(){
        super();
        this.createSpire();
    }
    createSpire(){
        this.spire = new Sprite(Texture.from("../../../assets/images/door.png"));
        this.addChild(this.spire);
        this.spire.x = 28;
    }
}