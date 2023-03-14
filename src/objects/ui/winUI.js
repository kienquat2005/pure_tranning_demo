import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Game } from "../../game";
import { Util } from "../../helper/utils";

export class WinUI extends Container {
  constructor() {
    super();
    this._initFakeBackground();
    this._initText();
    this.resize();
  }

  _initFakeBackground() {
    this.fakeBg = new Sprite(Texture.WHITE);
    this.fakeBg.alpha = 0.75;
    this.fakeBg.tint = 0x000000;
    this.addChild(this.fakeBg);

    Util.registerOnPointerDown(this.fakeBg, this._onTapBg, this);
  }

  _onTapBg() {
    this.emit("tapped");
  }

  resize() {
    this.fakeBg.width = Game.width;
    this.fakeBg.height = Game.height;
    this.text.x = Game.width / 2;
    this.text.y = Game.height / 2;
  }

  _initText() {
    let textStyle = new TextStyle({ fontSize: 52, align: "center", fill: 0xffffff });
    this.text = new Text("YOU WIN", textStyle);
    this.text.anchor.set(0.5);
    this.addChild(this.text);
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}