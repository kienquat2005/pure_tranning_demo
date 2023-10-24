import { Howl } from "howler";
import { Container } from "pixi.js";

export class SoundDie extends Container{
    constructor(){
        super()
        this.audio = new Howl({
            src: "/assets/sound/musicDie.mp3",
            volume: 0.2,
        })
    }
    play(){
        this.audio.play();
    }
    stop(){
        this.audio.stop();
    }
}