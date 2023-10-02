import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container,  Sprite,  Texture } from "pixi.js";
import starParticle from"/assets/json/particle.json";
import clearRowfullParticle from"/assets/json/clearRowfull.json";


    export class Effect extends Container{
        constructor(){
            super(); 
            this.group = new Container();
            this.addChild(this.group);
            this._initCleaRowFullParticle();
        }
        _initCleaRowFullParticle(){
            let texture = Texture.from("/assets/images/star_active.png");
            this.clearRowfullParticle = new Emitter(this.group,upgradeConfig(clearRowfullParticle,texture))
            this.clearRowfullParticle.emit = false;
            this.clearRowfullParticle.autoUpdate = true;
        }
        playClearRowFullParticle(){
            this.clearRowfullParticle.emit = true;
        }

    }
