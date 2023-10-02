import { Container, Sprite, Texture } from "pixi.js";

export class Base extends Container{
    constructor(){
        super();
        this._initBase();
    }
    _initBase(){
        this.base = new Sprite(Texture.from("/assets/images/base.png"));
        this.addChild(this.base);
    }
}