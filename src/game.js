import { Application } from "pixi.js";
import { PlayScene } from "./scenes/playScene";

export class Game {
    static init() {
        this.app = new Application({
            width : 512,
            height : 512,
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
