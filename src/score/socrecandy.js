import { Container, Text } from "pixi.js";
import { Tween } from '@tweenjs/tween.js';

export class ScoreCandy extends Container{
    constructor(){
        super()
        this.scoreCandys = 1;
        this.scoreCandy();
    }
    scoreCandy(){
         this.scoreCandy = new Text("+" + this.scoreCandys,{
            fontSize : 50,
            fill: 0xFFD700,

        });
        this.addChild(this.scoreCandy);
        let position = {x: this.scoreCandy.x, y: this.scoreCandy.y}
        this.showTween = new Tween({y : this.scoreCandy.y}).to({y: -200}).onUpdate((obj)=>{
            this.scoreCandy.y = obj.y;
        });

        this.alphaTween = new Tween({alpha : this.scoreCandy.alpha}).to({alpha : 0}).onUpdate((obj)=>{
            this.scoreCandy.alpha = obj.alpha;
        });

        
        // this.scaleTween= new Tween({scale : this.scoreCandy.scale}).to({scale : {x : 10, y : 10}}).onUpdate((obj)=>{
        //     this.scoreCandy.scale.set(obj.scale.x, obj.scale.y);
        // });
    }

    play(target){
        this.x = target.x;
        this.y = target.y;
        this.showTween.start();
        this.alphaTween.start();
        // this.scaleTween.start();
    }
}