import { Container, Sprite, Text, Texture } from "pixi.js";

export class Score extends Container {
    constructor(){
        super();
        this.score = 0;
        this._create();
    }

    _create(){
        this.scoreText = new Text("Score: " + this.score);
        this.addChild(this.scoreText);
    }
}