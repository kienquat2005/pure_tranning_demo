import { Container, Sprite, Texture } from "pixi.js";

export class Enemy extends Container{
    constructor(){
        super();
        this.velocity = 2;
        this.createEnemy();
    }
    createEnemy(){
        let sprite = new Sprite(Texture.from("/assets/images/blob.png"));
        this.addChild(sprite);
        return sprite;
    }
}