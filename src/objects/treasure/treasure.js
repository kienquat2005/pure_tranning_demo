import { Container, Sprite, Texture } from "pixi.js";

export class Treasure extends Container{
    constructor(){
        super();
        this.createSpire();
    }
    createSpire(){
        this.sprite = new Sprite(Texture.from("../../../assets/images/treasure.png"));
        this.addChild(this.sprite);
    }
}