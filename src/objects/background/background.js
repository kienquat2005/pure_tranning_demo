import { Container, Sprite, Texture } from "pixi.js";
export class Background extends Container{
    constructor(){
        super();
        this.createSpire();
    }
    createSpire(){
        this.spire = new Sprite(Texture.from("/assets/images/dungeon.png"))
        this.addChild(this.spire);
    }
}