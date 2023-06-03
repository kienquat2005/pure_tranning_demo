import { Container, Sprite, Texture } from "pixi.js";

export class BackGround extends Container {
    constructor(){
        super();
        this.createSprite();
    }

    createSprite(){
        this.sprite = new Sprite(Texture.from("/assets/images/dungeon.png"));
        this.addChild(this.sprite);
    }
}