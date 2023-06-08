import { Container, Sprite, Texture } from "pixi.js";

export class Door extends Container{
    constructor(){
        super();
        this.createSpireDoor();
    }
    createSpireDoor(){
        this.door = new Sprite(Texture.from("/assets/images/door.png"));
        this.addChild(this.door);
        this.door.x = 30;
        this.door.y = 0;
    }
}