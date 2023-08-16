import { Container, Text } from "pixi.js";

export class ScoreCandy extends Container{
    constructor(){
        super()
        this.scoreCandys = 1;
        this.scoreCandy();
    }
    scoreCandy(){
        this.scorecandy = new Text( this.scoreCandys,{
            fontSize : 50,

        });
        this.addChild(this.scorecandy);
    }
}