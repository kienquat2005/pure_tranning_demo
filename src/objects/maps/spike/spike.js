import { Container, Sprite, Texture } from "pixi.js";

export class Spike extends Container{
    constructor(){
        super();
        
    }
    _initSpike(){
        this.spike = new Sprite(Texture.from("/assets/images/spike-16-27-56.png"))
        this.addChild(this.spike);
    }
}