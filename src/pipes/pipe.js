import { Container, Sprite, Texture } from "pixi.js";

export class Pipe extends Container {
    constructor(){
        super();
        this.velocity = 1;
        this.createPipeUp();
        this.createPipeDow();
        this.score = 0;
    }
    createPipeUp(){
        this.pipeUp = new Sprite(Texture.from("/assets/images/pipe-up.png"));
        this.addChild(this.pipeUp)
        this.pipeUp.x = 0;
        this.pipeUp.y = -150;
    }
    createPipeDow(){
        this.pipeDOw = new Sprite(Texture.from("/assets/images/pipe-down.png"));
        this.addChild(this.pipeDOw)
        this.pipeDOw.x = 0 ; 
        this.pipeDOw.y = 300 ;
    }
}