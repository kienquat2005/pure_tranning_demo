import { Container, Sprite, Texture } from "pixi.js";

export class Spike extends Container{
    constructor(){
        super();
        this._initSpike();
        this.spkeVelocity = 7;
    }
    _initSpike(){
        this.spike = new Sprite(Texture.from("/assets/images/spike-16-27-56.png"))
        this.addChild(this.spike);
        this.spike.rotation = Math.PI/2;
        this.spike.x = 1000;
        this.spike.y = 525 ;
        this.spike.scale.x = 1.25;
        this.spike.scale.y = 1.25;
        this.spike.anchor.set(0.5)
    }

    spikeColliderWall(){
        this.spike.x -= this.spkeVelocity;
        if(this.spike.x < -20){
            this.spike.x = 740; 
        }
    }



    update(){
        this.spikeColliderWall();
    }

}