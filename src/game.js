import { Application } from "pixi.js";
import { GameConstant } from "./gameconstant";
import { PlayScene } from "./scenes/playScene";
import TWEEN from "@tweenjs/tween.js";

export class Game {
    static init() {
        this.app = new Application({
            width : GameConstant.GAME_WIDTH,
            height : GameConstant.GAME_HEIGHT,
        });
        document.body.appendChild(this.app.view);
        this.currentTime = 0;
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);
        this.resize(window.innerWidth, window.innerHeight);
        this.app.ticker.add(this.update.bind(this));
    }

    static update(dt){
        this.playScene.update(dt);
        this.currentTime += this.app.ticker.deltaMS;
        TWEEN.update(this.currentTime);
    }

    static resize(width, height) {
        this.app.view.width = width;
        this.app.view.height = height;
        this.app.resizeTo = this.app.view;
        this.app.resize();
    }
}

window.onload = function () {
    Game.init();
}

window.onresize = function(){
    Game.resize(window.innerWidth, window.innerHeight);
}