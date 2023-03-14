import { Container, Point, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../../physics/aabb/collider";
import { CollisionTag } from "../../physics/aabb/collisionTag";
import { CollisionEvent } from "../../physics/aabb/collissionEvent";

export class Player extends Container{
  constructor() {
    super();
    this.isMoved = false;
    this._startInputPos = new Point();
    this._initSprite();
    this._initCollider();
  }

  _initSprite() {
    this.playerSprite = new Sprite(Game.textures["cat"]);
    this.playerSprite.anchor.set(0.5);
    this.addChild(this.playerSprite);
  }

  _initCollider() {
    this.collider = new Collider(CollisionTag.Player);
    this.collider.width = 100;
    this.collider.height = 100;
    this.addChild(this.collider);
    this.collider.on(CollisionEvent.OnCollide, this._onCollide, this);
  }

  _onCollide(collider) {
    // console.log("collider with: ", collider);
  }

  onPointerDown(pos) {
    this.isMoved = true;
    this._startInputPos = pos;
  }

  onPointerMove(pos) {
    if (!this.isMoved) {
      return;
    }
    this.x = pos.x;
    this.y = pos.y;
  }

  onPointerUp() {
    this.isMoved = false;
  }
}