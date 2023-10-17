import { Container, Sprite, Texture } from "pixi.js";

export class PlatForm extends Container{
    constructor(){
        super();
        this.platForm = new Sprite(Texture.from("/assets/images/platforms.png"));
        this.addChild(this.platForm);
    }
}