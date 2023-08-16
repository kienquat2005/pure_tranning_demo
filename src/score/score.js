import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class Score extends Container{
    constructor(){
        super();
        this.score = 0;
        this.circle();
        this.scores();
        this.scorecandy = 1;

    }
    scores(){
        this.scoreText = new Text(this.score,{
        align: "center",
        fontFamily: "Arial",
        fontSize: 300,
        fill: 0x6c706d,
        });
        this.scoreText.anchor.set(0.5,0.5);
        this.addChild(this.scoreText);
    }
    circle(){
        this.circles = new Graphics();
        this.circles.lineStyle(0);
        this.circles.beginFill(0xffffff)
        this.circles.drawCircle(10,10,200);
        this.addChild(this.circles);
    }
}