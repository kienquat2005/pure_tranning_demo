import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container, Texture } from "pixi.js";
import effecPlayerDie from "/assets/json/effectPlayerDie.json"

export class EffectPlayerDie extends Container{
    constructor(){
        super();
        this.ground = new Container()
        this.addChild(this.ground);
        this._initEffecyPlayerDie();
    }
    _initEffecyPlayerDie() {
        let texture = Texture.from("/assets/images/lump.png")
        this.effectplayerDie = new Emitter(this.ground,upgradeConfig(effecPlayerDie,[texture]))
        this.effectplayerDie.emit = true;
        this.effectplayerDie.autoUpdate = true;
    }
    
    play() {
        this.effectplayerDie.emit = true;
    }
}