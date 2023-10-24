import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container, Texture } from "pixi.js";
import firework from "/assets/particles/firework.json";

export class FireworkEffect extends Container{
    constructor(){
        super()
        let firework1 = Texture.from("/assets/images/spr_firework1.png");
        let firework2 = Texture.from("/assets/images/spr_firework2.png");
        let firework3 = Texture.from("/assets/images/spr_firework3.png");
        let firework4 = Texture.from("/assets/images/spr_firework4.png");
        let firework5 = Texture.from("/assets/images/spr_firework5.png");
        let firework6 = Texture.from("/assets/images/spr_firework6.png");
        let firework7 = Texture.from("/assets/images/spr_firework7.png");
        let firework8 = Texture.from("/assets/images/spr_firework8.png");
        let firework9 = Texture.from("/assets/images/spr_firework9.png");

        this.firework = new Emitter(this, upgradeConfig(firework,[firework1, firework2, firework3, firework4, firework5,
            firework6, firework7, firework8, firework9]));
            this.firework.autoUpdate = true;
            this.firework.emit = false;
    }
    play(){
        this.firework.emit = true;
    }
}