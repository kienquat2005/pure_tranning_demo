import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Container, Texture } from "pixi.js";
import particleConfig from "../../../assets/json/particleConfig.json";
import { Game } from "../../game";

export class BubbleEffect extends Container{
  constructor(){
    super("BubbleEffect");
    let texture = Game.textures["bubbles"];
    this.emitter = new Emitter(this, upgradeConfig(particleConfig, [texture]));
    // console.log(this.emitter);
    // this.emitter.emit = true;
    // this.addChild(this.emitter);
    // this.emitter.emit = false;
  }

  play() {
    this.emitter.playOnce();
  }

  update(dt) {
    this.emitter.update(dt);
  }
}