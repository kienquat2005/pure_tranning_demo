import { Application, Assets, Sprite } from "pixi.js";
import { GameConstant } from "./gameConstant";
import { InputManager } from "./input/inputManager";
import { Physics } from "./physics/physics";
import { PlayScene } from "./scenes/playScene";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        this.resize(window.innerWidth, window.innerHeight);
        this._loadGameAssets((textures) => {
            this.textures = textures;
            InputManager.init(this.app.view);
            Physics.init();
            this._initScene();
            this.app.ticker.add(this.update, this);
        });  
    }

    static resize(width, height) {
        let style = this.app.view.style;
        this.windowWidth = width;
        this.windowHeight = height;
        let ratio = Math.max(GameConstant.GAME_WIDTH / this.windowWidth, GameConstant.GAME_HEIGHT / this.windowHeight);
        this.width = this.windowWidth * ratio;
        this.height = this.windowHeight * ratio;
        this.app.view.width = this.width;
        this.app.view.height = this.height;
        let scale = this.windowWidth / this.width;
        style.transformOrigin = "0px 0px";
        style.transform = `scale(${scale})`;
        let vMargin = Math.floor((this.windowWidth - this.width * scale) / 2);
        let hMargin = Math.floor((this.windowHeight - this.height * scale) / 2);

        style.margin = `${hMargin}px ${vMargin}px ${hMargin}px ${vMargin}px`;
        this.app.resizeTo = this.app.view;
        this.app.resize();

        this.playScene && this.playScene.resize();
    }

    static _loadGameAssets(callback) {
        this.keys = [];
        this._addTexture("cat", "assets/images/cat.png");
        this._addTexture("mouse", "assets/images/mouse.png");
        Assets.load(this.keys).then((textures) => {
            callback && callback(textures);
        });
    }

    static _addTexture(key, url) {
        this.keys.push(key);
        Assets.add(key, url);
    }

    static _initScene() {
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);
    }

    static update(dt) {
        Physics.update(dt);
        this.playScene.update(dt);
    }
}

window.onload = function () {
    Game.init();
}

window.addEventListener("resize", (event) => {
    Game.resize(window.innerWidth, window.innerHeight)
});
