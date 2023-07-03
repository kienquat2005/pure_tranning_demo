import { Application } from "pixi.js";
import { GameConstant } from "./gameconstant";
import { PlayScene } from "./scenes/playScene";

export class Game {
    static init() {
        this.app = new Application({
            width : GameConstant.GAME_WIDTH,
            height : GameConstant.GAME_HEIGHT,
        });
        document.body.appendChild(this.app.view);

        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);

        this.app.ticker.add((dt) => this.playScene.update(dt))
    }


}

window.onload = function () {
    Game.init();
}