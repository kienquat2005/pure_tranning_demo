import { Util } from "../../helper/utils";
import { CollisionTag } from "./collisionTag";
import { CollisionEvent } from "./collissionEvent";

export class CollisionDetector {
  /** @type {CollisionDetector} */
  static _instance;

  static get instance() {
    if (!this._instance) {
      this._instance = new CollisionDetector();
    }

    return this._instance;
  }

  constructor() {
    this.groups = {};
  }

  init(filters) {
    this.filters = filters;
    Object.keys(CollisionTag).forEach((key) => {
      var tag = CollisionTag[key];
      this.groups[tag] = [];
    });
  }

  update() {
    this.filters.forEach((filter) => this._checkFilter(filter));
  }

  _checkFilter(filter) {
    filter.collideTags.forEach((tag) => this._checkTags(filter.tag, tag));
  }

  _checkTags(tag1, tag2) {
    this.groups[tag1].forEach((collider) => {
      if (collider.enabled) {
        this._checkCollider(collider, this.groups[tag2]);
      }
    });
  }

  _checkCollider(collider, group) {
    for (var i = 0; i < group.length; i++) {
      var collider2 = group[i];
      if (collider2.enabled && this._isCollide(collider, collider2)) {
        collider.emit(CollisionEvent.OnCollide, collider2);
        collider2.emit(CollisionEvent.OnCollide, collider);
      }

      if (!collider.enabled) {
        return;
      }
    }
  }

  _isCollide(collider1, collider2) {
    this._pos1 = collider1.getPosition();
    this._pos2 = collider2.getPosition();
    return Util.AABBCheck(
      this._pos1.x, this._pos1.y, collider1.width, collider1.height, this._pos2.x, this._pos2.y, collider2.width, collider2.height,
    );
  }

  

  add(collider) {
    let tag = collider.tag;
    this.groups[tag].push(collider);
  }

  remove(collider) {
    let tag = collider.tag;
    let group = this.groups[tag];
    let index = group.indexOf(group.indexOf(collider));
    if (index >= 0) {
      group.splice(index, 1);
    }
  }
}
