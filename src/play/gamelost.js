import { Container, FillStyle, Graphics, Text } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class Gamelose extends Container{
    constructor(){
        super();
        this.baseGameLose();
        this.showText();
        this.restart();

    }
    baseGameLose(){
        this.gamelose = new Graphics()
        // this.gamelose.lineStyle(2, 0x000000);
        this.gamelose.beginFill(0x1C1818);
        this.gamelose.drawRect(0, 0 , GameConstant.WITHDBASE_GAMELOST, GameConstant.HEIGHTBASE_GAMELOST);
        this.gamelose.pivot.set(GameConstant.WITHDBASE_GAMELOST/2, GameConstant.HEIGHTBASE_GAMELOST/2);
        this.addChild(this.gamelose);
        this.gamelose.endFill();
        this.gamelose.x = 350;
        this.gamelose.y = 500;
    }
    showText(){
        this.texty = new Text("Game Over",{
            fontSize: 90,
            fill: "white"
        })
        this.texty.anchor.set(0.5,0.5);
        this.texty.x = 350;
        this.texty.y = 400;
        this.addChild(this.texty);
    }
    restart(){
        this.readLoad = new Graphics()
        this.readLoad.lineStyle(2, 0x000000, 1);
        this.readLoad.beginFill(0xffffff);
        this.readLoad.drawRect(0, 0, 200, 100);
        this.readLoad.pivot.set(50, 50);
        this.readLoad.x = 300;
        this.readLoad.y = 550;
        this.readLoad.endFill();
        this.addChild(this.readLoad);
        this.textReadLoad = new Text("Restart",{
            fontSize: 50,
            fill: "Red"
        })
        this.textReadLoad.anchor.set(0.5, 0.5);
        this.textReadLoad.x = 350;
        this.textReadLoad.y = 550;
        this.addChild(this.textReadLoad);
        this.readLoad.eventMode = "static";
        this.readLoad.on("pointerdown",()=>{
            this.readload();
        })
    }
    readload(){
        location.reload();
    }
}