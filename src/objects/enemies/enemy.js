import { Container, Sprite, Texture } from "pixi.js";

export class Enemy extends Container{
    constructor(){
        super();
        this.velocity = 1;
        this.createSpireEnemy();
    }
    createSpireEnemy(){
        this.enemy = new Sprite(Texture.from("/assets/images/blob.png"))
        this.addChild(this.enemy);
    }
}