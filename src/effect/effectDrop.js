import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container,  Sprite,  Texture } from "pixi.js";
import droplParticle from"/assets/json/dropParticle.json"

    export class EffectDrop extends Container{
        constructor(){
            super(); 
            this.group = new Container();
            this.addChild(this.group);
            this._initParticleDrop();
        }
        _initParticleDrop(){
            let texture = Texture.from("/assets/images/alpha.png");
            this.dropParticle = new Emitter(this.group,upgradeConfig(droplParticle,texture));
            this.dropParticle.emit = false;
            this.dropParticle.autoUpdate = true;

        }
        playDropParticle(){
            this.dropParticle.emit = true;
        }

        stopDropParticle() {
            this.dropParticle.emit = false;
        }
    }
