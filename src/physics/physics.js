import { CollisionDetector } from "./aabb/collisionDetector";
import { CollisionTag } from "./aabb/collisionTag";

export class Physics {
  static init() {
    CollisionDetector.instance.init([
      {
        tag         : CollisionTag.Player,
        collideTags : [CollisionTag.Enemy],
      },
    ]);
  }

  static update() {
    CollisionDetector.instance.update();
  }
}
