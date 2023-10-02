import { Container, Sprite, Text, Texture } from "pixi.js";

export class Score extends Container{
    constructor(){
        super();
        this.scores = 0;
        this.score();
        this.nameGame();
        this.scoreText();
    }
    nameGame(){
        this.tetrisTitle = new Sprite(Texture.from("/assets/images/project-logo.png"))
        this.tetrisTitle.anchor.set(0.5, 0.5);
        this.tetrisTitle.x = 350;
        this.tetrisTitle.y = 50;
        this.addChild(this.tetrisTitle);
        this.tetrisTitle.scale.x = 0.8;
        this.tetrisTitle.scale.y = 0.8;
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