import { Container } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../helper/utils";
import { Enemy, EnemyEvent } from "./enemy";

export const EnemyManagerEvent = Object.freeze({
  Removed: "enemymanager:remove",
})

export class EnemyManager extends Container{
  constructor() {
    super();
    this.enemies = [];
    this._spawnEnemies();
    this.enemies.forEach(enemy => {
      enemy.on(EnemyEvent.Collide, this.remove.bind(this, enemy));
    });
  }

  _spawnEnemies() {
    for (let i = 0; i < GameConstant.ENEMY_POOL; i++){
      this._spawnEnemy();
    }
  }

  _spawnEnemy() {
    let enemy = new Enemy();
    let x = Util.random(0, Game.width);
    let y = Util.random(0, Game.height / 2);
    enemy.x = x;
    enemy.y = y;
    this.enemies.push(enemy);
    this.addChild(enemy);
  }

  remove(enemy) {
    let index = this.enemies.indexOf(enemy);
    if (index >= 0) {
      this.enemies.splice(index, 1);
      this.removeChild(enemy);
      this.emit(EnemyManagerEvent.Removed, enemy);
      enemy.destroy();
    }
  }

  update(dt) {
    this.enemies.forEach(enemy => enemy && enemy.update(dt));
  }
}