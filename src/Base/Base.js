import { Container, Sprite, Texture } from "pixi.js";

export class Base extends Container{
    constructor(){
        super();
        this.bases = [];
        this.creaBase1();
        this.creaBase2();
        this.velocity = 3;
    }
    creaBase1(){
        let base1 = new Sprite(Texture.from("/assets/images/base.png"));
        this.addChild(base1);
        base1.x = 0;
        base1.y = 400;
        this.bases.push(base1);
    } 
    creaBase2(){
        let base2 = new Sprite(Texture.from("/assets/images/base.png"))
        base2.x = 288;
        base2.y = 400;
        this.addChild(base2)
        this.bases.push(base2);
    }
}