import { Container, Text } from "pixi.js";
import { Tween } from '@tweenjs/tween.js';

export class ScoreCandy extends Container{
    constructor(){
        super()
        this.scoreCandys = 1;
        this.initScoreCandy()
        this._initTween();
    }
    initScoreCandy(){
         this.scoreCandy = new Text("+" + this.scoreCandys,{
            fontSize : 50,
            fill: 0xFFD700,

        });
        this.addChild(this.scoreCandy);
        this.visible = false;
    }

    _initTween() {
        this.showTween = new Tween({y : this.scoreCandy.y}).to({y: -200}).onUpdate((obj)=>{
            this.scoreCandy.y = obj.y;
        });

        this.alphaTween = new Tween({alpha : this.scoreCandy.alpha}).to({alpha : 0}).onUpdate((obj)=>{
            this.scoreCandy.alpha = obj.alpha;
        });
    }

    play(target){
        this.x = target.x;
        this.y = target.y;
        this.visible = true;
        this.showTween.start();
        this.alphaTween.start();
    }
}