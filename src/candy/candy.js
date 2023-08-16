import { Container, Sprite, Texture } from "pixi.js";
import { Tween } from '@tweenjs/tween.js';
import { Game } from "../game";

export class candy extends Container{
    constructor(){
        super();
        this.createCandy();
        this.isleft = false;
    }

    createCandy(){
        let candy = new Sprite(Texture.from("/assets/images/candy.png"))
        this.addChild(candy);
        let position = {x: candy.x, y : candy.y }
        candy.move = new Tween({y : candy.y}).to({y: 50}).yoyo(true).repeat(Infinity).onUpdate((obj)=>{
            candy.y = obj.y;
        });
        candy.move.start(Game.currentTime);
    }

    randomCandy(){
        let randomNumber = Math.floor(Math.random() * 601) + 200;;
        return randomNumber;
    }
    
}
    