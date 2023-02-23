import { Application, Sprite } from "pixi.js";

export default class Game {
    constructor() {
        this.app = new Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
            resolution: window.devicePixelRatio || 1,
        });
        
        document.body.appendChild(this.app.view);
    }

    start() {
        const cat = Sprite.from('assets/images/cat.png');

        cat.x = this.app.screen.width / 2;
        cat.y = this.app.screen.height / 2;
        cat.anchor.set(0.5);
        this.app.stage.addChild(cat);

        this.app.ticker.add((delta) => {
            cat.rotation += 0.1 * delta;
        });
    }
}

window.onload = function () {
    const game = new Game();
    game.start();
}
