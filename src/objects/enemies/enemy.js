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
    this.speed = Util.random(-GameConstant.ENEMY_SPEED, GameConstant.ENEMY_SPEED);
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
    this.x += this.speed * dt;
    this.y += this.speed * dt;
    if (this.currTime > GameConstant.ENEMY_INTERVAL) {
      this.speed = Util.random(-GameConstant.ENEMY_SPEED, GameConstant.ENEMY_SPEED);
      this.currTime = 0;
    }
  }

  destroy() {
    super.destroy();
  }
}