import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";

export class PlayUI extends Container{
  constructor() {
    super();
    this.playTime = 0;
    this._initTimer();
    this._initScore();
    this.resize();
  }

  _initTimer() {
    let textStyle = new TextStyle({ fontSize: 52, align: "center", fill: 0xffffff });
    this.timerText = new Text(`Playtime: ${this._formatTime(0)}`, textStyle);
    this.timerText.anchor.set(0);
    this.addChild(this.timerText);
  }

  _formatTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    var milliseconds = Math.floor((totalSeconds % 1) * 100);
    return (minutes < 10 ? "" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  _initScore() {
    let textStyle = new TextStyle({ fontSize: 52, align: "center", fill: 0xffffff });
    this.scoreText = new Text(`Score: 0`, textStyle);
    this.scoreText.anchor.set(1, 0);
    this.addChild(this.scoreText);
  }

  updateScore(score) {
    this.scoreText.text = `Score: ${score}`;
  }

  updateTime(dt) {
    this.playTime += dt;
    this.timerText.text = `Playtime: ${this._formatTime(this.playTime)}`;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  resize() {
    this.timerText.x = 50
    this.timerText.y = 50;
    this.scoreText.x = Game.width - 50;
    this.scoreText.y = 50;
  }
}