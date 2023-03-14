import { Container, Point, Sprite } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../helper/utils";
import { Collider } from "../../physics/aabb/collider";
import { CollisionTag } from "../../physics/aabb/collisionTag";
import { CollisionEvent } from "../../physics/aabb/collissionEvent";

export const EnemyEvent = Object.freeze({
  Collide: "enemy:collide"
})

export class Enemy extends Container{
  constructor() {
    super();
    this._initSprite();
    this._initCollide();
    this.currTime = 0;
    this.speed = new Point();
    this.speed.x = Util.random(-GameConstant.ENEMY_SPEED, GameConstant.ENEMY_SPEED);
    this.speed.y = Util.random(-GameConstant.ENEMY_SPEED, GameConstant.ENEMY_SPEED);
  }

  _initSprite() {
    this.sprite = new Sprite(Game.textures["mouse"]);
    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);
  }

  _initCollide() {
    this.collider = new Collider(CollisionTag.Enemy);
    this.addChild(this.collider);
    this.collider.on(CollisionEvent.OnCollide, this._onCollide, this);
  }

  _onCollide(collider) {
    this.emit(EnemyEvent.Collide);
  }

  update(dt) {
    this.currTime += dt;
    this.x += this.speed.x * dt;
    this.y += this.speed.y * dt;
    this._checkOutOfScreen();
  }

  _checkOutOfScreen() {
    let top = 0;
    let bottom = Game.height;
    let left = 0;
    let right = Game.width;
    if (this.x <= left || this.x >= right) {
      this.speed.x = -this.speed.x;
    }
    if (this.y <= top || this.y >= bottom) {
      this.speed.y = -this.speed.y;
    }
  }

  destroy() {
    super.destroy();
  }
}