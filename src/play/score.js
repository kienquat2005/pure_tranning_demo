import { Container, Text } from "pixi.js";

export class Score extends Container{
    constructor(){
        super();
        this.scores = 0;
        this.score();
        this.nameGame();
        this.scoreText();
    }
    nameGame(){
        this.nameText = new Text("GAME TETRIS",{
            fontSize: "Arial",
            fontSize: 70,
            fill: "white"
        })
        this.nameText.anchor.set(0.5, 0.5);
        this.nameText.x = 350;
        this.nameText.y = 50;
        this.addChild(this.nameText);
    }
    score(){
        this.score = new Text(this.scores,{
            fontFamily: "Arial",
            fontSize: 50,
            fill: "white",
        });
        this.score.x = 250;
        this.score.y = 1100;
        this.addChild(this.score);
    }
    scoreText(){
        this.scoreText = new Text("Score:",{
            fontFamily: "Arial",
            fontSize: 50,
            fill: "white",
        });
        this.scoreText.x = 100;
        this.scoreText.y = 1100;
        this.addChild(this.scoreText);
    }

}