import { Container } from "pixi.js";

export class FireworkSound extends Container{
    constructor(){
        super();
        this.audio = new Howl({
            src:"/assets/sound/sfx_firework.mp3",
            volume: 0.5,
        })
        
    }
    play(){
        this.audio.play()
    }
    stop(){
        this.audio.stop()
    }

}