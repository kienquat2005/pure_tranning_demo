import { Container, Graphics } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameconstant";

export class Background extends Container{
    constructor(){
        super();
        this.createBackground();
        this.createabaseup();
        this.createabasedow();
        
    }
    createBackground(){
        this.background = new Graphics();
        this.background.beginFill(0xffffff);
        this.background.drawRect(0, 0,GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT );
        this.background.endFill();
        this.addChild(this.background);
    }
    createabaseup(){
        this.baseup = new Graphics();
        this.baseup.beginFill(0x8f8e88);
        this.baseup.drawRect(0,0,GameConstant.GAME_WIDTH,40);
        this.baseup.endFill();
        this.addChild(this.baseup);
    }
    createabasedow(){
        this.basedow = new Graphics();
        this.basedow.beginFill(0x8f8e88);
        this.basedow.drawRect(0,0,GameConstant.GAME_WIDTH,40);
        this.basedow.endFill();
        this.basedow.y = GameConstant.GAME_HEIGHT- 40;
        this.addChild(this.basedow);
    }
}