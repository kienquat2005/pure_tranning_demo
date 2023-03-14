export class Util {
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static AABBCheck(x1, y1, w1, h1, x2, y2, w2, h2) {
    return ((x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (y1 + h1 > y2));
  }

  static registerOnPointerDown(displayObject, onPointerDown, context) {
    displayObject.interactive = true;
    displayObject.on("pointerdown", onPointerDown, context);
  }
}