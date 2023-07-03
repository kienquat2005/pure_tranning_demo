import { Container, Graphics } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameconstant";

export class Background extends Container{
    constructor(){
        super();
        this.createBackground();
        
    }
    createBackground(){
        this.background = new Graphics();
        this.background.beginFill(0xffffff);
        this.background.drawRect(0, 0,GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT );
        this.background.endFill();
        this.addChild(this.background);
    }
}