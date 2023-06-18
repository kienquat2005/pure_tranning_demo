import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameConstant";

export class Youlose extends Container{
    constructor(){
        super();
        this.createYoulose();
    }
    createYoulose(){
        this.lose = new Sprite(Texture.from("/assets/images/gameover.png"));
        this.lose.width = 192;
        this.lose.height = 42;
        this.lose.pivot.set(this.lose.width/2, this.lose.height / 2)
        this.addChild(this.lose);
        this.lose.x = GameConstant.GAME_WIDTH / 2 ;
        this.lose.y = GameConstant.GAME_HEIGHT / 2;
    }
}