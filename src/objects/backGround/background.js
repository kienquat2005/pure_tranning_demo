import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameconstant";

export class BackGround extends Container{
    constructor(){
        super();
        this._initBackGround();
    }
    _initBackGround(){
        this.bg = new Sprite(Texture.from("/assets/images/BG.png"))
        this.bg.x = GameConstant.GAME_WIDTH/2;
        this.bg.y = GameConstant.GAME_HEIGHT/3;
        this.addChild(this.bg);  
        this.bg.anchor.set(0.5);
        this.bg.scale.x = 0.4;
        this.bg.scale.y = 0.4
    }
}