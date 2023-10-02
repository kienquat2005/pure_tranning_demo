import { Tween } from "@tweenjs/tween.js";
import { Container, Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameconstant";

export class BackGround extends Container{
    constructor(){
        super();
        this._initBackGround();
    }
    _initBackGround(){
        this.bg = new Sprite(Texture.from("/assets/images/backGround.jpg"))
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);
        this.bg.width = GameConstant.GAME_WIDTH;
        this.bg.height = GameConstant.GAME_HEIGHT;
        this.bg.x = 360;
        this.bg.y = GameConstant.GAME_WIDTH/1.3
        this.bg.alpha = 0.4;
    }
}