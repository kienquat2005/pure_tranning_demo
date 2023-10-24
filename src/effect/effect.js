import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container, Texture } from "pixi.js";
import effect from"/assets/particles/effect.json"

export class Effect extends Container{
    constructor(){
        super();
        this.group = new Container();
        this.addChild(this.group);
        this._initEffect();
    }

    _initEffect(){
        let texture = Texture.from("/assets/images/star_active.png");
        this.effect = new Emitter(this.group,upgradeConfig(effect,texture));
        this.effect.emit = false;
        this.effect.autoUpdate = true;
    }

    play(){
        this.effect.emit = true;
    }
    stop(){
        this.effect.emit = false;
    }
}