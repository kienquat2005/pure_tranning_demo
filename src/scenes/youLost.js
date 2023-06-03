import { Container, Graphics, Text } from "pixi.js";

export class YouLose extends Container{
    constructor(){
        super();
        this.createBackgroud();
        this.createYoulose();
    }
    createBackgroud(){
        this.Background = new Graphics();
        this.Background.beginFill(0x000000);
        this.Background.drawRect(0, 0,512, 512);
        this.addChild(this.Background);
    }
    createYoulose(){
        this.texty = new Text(" You Lose ",{
            fill : 0xffffff
        });
        this.addChild(this.texty);
        this.texty.x = 512 / 2;
        this.texty.y = 512 / 2;

}
}