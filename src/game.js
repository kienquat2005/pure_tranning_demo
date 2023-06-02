import { Application } from "pixi.js";

export class Game {
    static init() {
        this.app = new Application({
            width: 720,
            height: 1280,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
    }
}

window.onload = function () {
    Game.init();
}
