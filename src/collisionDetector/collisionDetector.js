import { Container } from "pixi.js";

export class CollisionDetector extends Container{
   static detectCollision(obj1, obj2,){
    const object1Bounds = obj1.getBounds();
    const object2Bounds = obj2.getBounds();
    if (
      object1Bounds.x + object1Bounds.width > object2Bounds.x &&
      object1Bounds.x < object2Bounds.x + object2Bounds.width &&
      object1Bounds.y + object1Bounds.height > object2Bounds.y &&
      object1Bounds.y < object2Bounds.y + object2Bounds.height
    ) {
      return true;
    }
  
    return false;
  }
}