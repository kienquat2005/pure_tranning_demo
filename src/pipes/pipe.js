import { Container, Sprite, Texture } from "pixi.js";

export class Pipe extends Container {
    constructor(){
        super();
        this.velocity = 1.5;
        this._createPipeUp();
        this._createPipeDown();
    }

    _createPipeUp(){
        this.pipeUp = new Sprite(Texture.from("/assets/images/pipe-up.png"));
        this.addChild(this.pipeUp);
        this.pipeUp.y = -150;
    }

    _createPipeDown(){
        this.pipeDown = new Sprite(Texture.from("/assets/images/pipe-down.png"));
        this.addChild(this.pipeDown);
        this.pipeDown.y = 300
    }
    
      
}