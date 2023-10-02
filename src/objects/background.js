import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class BackGround extends Container{
    constructor(){
        super();
        this._initBackGround();
    }
    _initBackGround(){
        this.bg = new Sprite(Texture.from("/assets/images/bg2.jpg"))
        this.bg.x = GameConstant.GAME_WIDTH/2;
        this.bg.y = GameConstant.GAME_HEIGHT/2;
        this.addChild(this.bg);  
        this.bg.anchor.set(0.5)
    }
}