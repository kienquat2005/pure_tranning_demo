import { Container, Text } from "pixi.js";

export class Score extends Container{
    constructor(){
        super();
        this.score = 0;
        this.scores();
        
        // console.log(this.score);

    }
    scores(){
        this.scoreText = new Text("Score: "+this.score  ,{
            align: "center",
            fontFamily: "Arial",
            fontSize: 35,
            fill: 0xffffff,
        });
        // this.scoreText = new Text(`score: ${this.score}`  ,{
        //     align: "center",
        //     fontFamily: "Arial",
        //     fontSize: 35,
        //     fill: 0xffffff,
        // });
        this.addChild(this.scoreText);
    }
}