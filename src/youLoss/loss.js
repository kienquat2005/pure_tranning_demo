import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class Youloss extends Container{
    constructor(){
        super();
        this.showText();
        this.basePoint();
        this.showCup();
        this.showRank();
        this.showPoint();
        this.baseReplay();

    }
    showText(){
        this.texty = new Text("DON'T TOUCH \n THE SPIKES",{
            fontSize: 100
        })
        this.texty.anchor.set(0.5,0.5);
        this.texty.x = GameConstant.GAME_WIDTH/2 +10;
        this.texty.y = 200;
        this.addChild(this.texty);
        this.bestSocer = new Text("BEST SCORE : ",{
            fontSize: 60
        })

        this.bestSocer.x = 110;
        this.bestSocer.y = 1050;
        this.addChild(this.bestSocer);
        this.gamesPLay = new Text("GAMES PLAYED : ",{
            fontSize: 60
        })
        this.gamesPLay.x = 110;
        this.gamesPLay.y = 1140;
        this.addChild(this.gamesPLay);
    }

    basePoint(){
        this.basePoints = new Graphics()
        this.basePoints.lineStyle(2, 0x000000, 1);
        this.basePoints.beginFill(0xe60712);
        this.basePoints.drawRoundedRect(0, 0, GameConstant.WIDTHRECT_POINT, GameConstant.HEIGHTRECT_POINT, 10);
        this.basePoints.pivot.set(GameConstant.WIDTHRECT_POINT/2,GameConstant.HEIGHTRECT_POINT/2);
        this.basePoints.x = GameConstant.GAME_WIDTH/2;
        this.basePoints.y = GameConstant.GAME_HEIGHT/2 -100;
        this.basePoints.endFill();
        this.addChild(this.basePoints);
    }

    showPoint(){
        this.textPoint = new Text("Point", {
            fontSize: 50,
            fill:"white",

        })
        this.textPoint.anchor.set(0.5,0.5)
        this.textPoint.x = 360;
        this.textPoint.y = 580;
        this.addChild(this.textPoint);
    }

    showCup(){
        this.basecup = new Graphics()
        this.basecup.beginFill(0x6b030f);
        this.basecup.drawRoundedRect(0, 0, 120, 120 )
        this.basecup.pivot.set(60, 60);
        this.basecup.x = 220;
        this.basecup.y = 540;
        this.addChild(this.basecup);
        this.cup = new Sprite(Texture.from("/assets/images/cup.png"));
        this.cup.anchor.set(0.5,0.5);
        this.cup.scale.x = 0.2;
        this.cup.scale.y = 0.2;
        this.cup.x = 220;
        this.cup.y = 540;
        this.addChild(this.cup);
    }
    
    showRank(){
        this.baseRank = new Graphics()
        this.baseRank.beginFill(0x6b030f);
        this.baseRank.drawRoundedRect(0, 0, 120, 120 )
        this.baseRank.pivot.set(60, 60);
        this.baseRank.x = 500;
        this.baseRank.y = 540;
        this.addChild(this.baseRank);
        this.rank = new Sprite(Texture.from("/assets/images/Rank.png"));
        this.rank.anchor.set(0.5,0.5);
        this.rank.scale.x = 2;
        this.rank.scale.y = 2;
        this.rank.x = 500;
        this.rank.y = 550;
        this.addChild(this.rank);
    }
    baseReplay(){
        this.replay = new Graphics()
        this.replay.lineStyle(2, 0x000000, 1);
        this.replay.beginFill(0xe60712);
        this.replay.drawRoundedRect(0, 0, GameConstant.WIDTHRECT_POINT, GameConstant.HEIGHTRECT_POINT, 10);
        this.replay.pivot.set(GameConstant.WIDTHRECT_POINT/2,GameConstant.HEIGHTRECT_POINT/2);
        this.replay.x = GameConstant.GAME_WIDTH/2;
        this.replay.y = GameConstant.GAME_HEIGHT/2 +100;
        this.replay.endFill();
        this.addChild(this.replay);
        this.textReplay = new Text("REPLAY",{
            fontSize: 50
        }
        );
        this.texty.anchor.set(0.5, 0.5);
        this.textReplay.x = GameConstant.GAME_WIDTH/2 - 100;
        this.textReplay.y = GameConstant.GAME_HEIGHT/2 +70;
        this.addChild(this.textReplay);
        this.replay.eventMode = "static";
        this.replay.on("pointerdown", () => {
            this.readload();
        })
    }
    readload(){
        location.reload();
    }

}