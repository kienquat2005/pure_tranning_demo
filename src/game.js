// import { Application, Sprite, Texture } from "pixi.js";

import { Application, Container, Graphics, Sprite, TextStyle, Text, BitmapText, AnimatedSprite, Texture } from "pixi.js";

export class Game {
    constructor(){
        this.app = new Application();
        document.body.appendChild(this.app.view);
    }


}
var game = new Game();

