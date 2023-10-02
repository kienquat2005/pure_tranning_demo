import { Application } from "pixi.js";
import { GameConstant } from "./gameconstant";
import { PlayScene } from "./scenes/playScene";
import TWEEN from "@tweenjs/tween.js";

export class Game {
    static init() {
        this.app = new Application({
            width : GameConstant.GAME_HEIGHT,
            height : GameConstant.GAME_WIDTH,
        });
        document.body.appendChild(this.app.view);
        this.playScene = new PlayScene();
        this.currentTime = 0;
        this.app.stage.addChild(this.playScene);
        this.app.ticker.add((dt) => {
            this.update(dt);
        });
        
    }
    
    static update(dt){
        this.playScene.update(dt)
        this.currentTime += this.app.ticker.deltaMS;
        TWEEN.update(this.currentTime);
    }

    // static pause(){
    //     this.playScene.pause();
    // }

    // static resume(){
    //     this.playScene.resume();
    // }
}

window.onload = function () {
    Game.init();
}

window.onblur = ()=> {
    // Game.pause();
}

window.onfocus = ()=> {
    // Game.resume();
}