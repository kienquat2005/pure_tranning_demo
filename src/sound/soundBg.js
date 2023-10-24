import { Howl } from "howler";
import { Container } from "pixi.js";

export class SoundBg extends Container{
    constructor(){
        super()
        this.audio = new Howl({
            src: "/assets/sound/musicBg.mp3",
            autoplay: true,
            loop: false,
            volume: 0.2
        })
        this.audio.play();
    }
    stop(){
        this.audio.stop();
    }
}