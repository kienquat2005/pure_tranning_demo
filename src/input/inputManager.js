import { utils } from "pixi.js";

export class InputManager {
  /**
   * @class InputManager
   * @param {HTMLCanvasElement} canvas 
   */
  static init(canvas) {
    this.canvas = canvas;
    this.emitter = new utils.EventEmitter();
    this.startPosition = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.isPointerDown = false;
    this._tmpPos = { x: 0, y: 0 };
    this._registerDOMEvents();
  }

  static _registerDOMEvents() {
    document.addEventListener("touchstart", e => this._handleTouchEvent(e, this._mouseDownEventHandler.bind(this)), { passive: false });
    document.addEventListener("touchmove", e => this._handleTouchEvent(e, this._mouseMoveEventHandler.bind(this)), { passive: false });
    document.addEventListener("touchend", e => this._handleTouchEvent(e, this._mouseUpEventHandler.bind(this)), { passive: false });

    document.addEventListener("mousedown", e => this._mouseDownEventHandler(e));
    document.addEventListener("mousemove", e => this._mouseMoveEventHandler(e));
    document.addEventListener("mouseup", e => this._mouseUpEventHandler(e));
  }

  /**
   * @param {TouchEvent} evt 
   * @param {(evt: Touch) => void} callback 
   */
  static _handleTouchEvent(evt, callback) {
    evt.preventDefault();
    callback(evt.touches[0]);
  }

  /**
   * @param {Touch} evt 
   */
  static _mouseDownEventHandler(evt) {
    this._tmpPos = this.getCanvasMousePos(evt);
    this.startPosition.x = this._tmpPos.x;
    this.startPosition.y = this._tmpPos.y;
    this.position.x = this._tmpPos.x;
    this.position.y = this._tmpPos.y;
    this.isPointerDown = true;

    this.emitter.emit(InputEvent.MouseDown, this.position, this.startPosition);
  }

  /**
   * @param {Touch} evt 
   */
  static _mouseMoveEventHandler(evt) {
    this._tmpPos = this.getCanvasMousePos(evt);
    this.position.x = this._tmpPos.x;
    this.position.y = this._tmpPos.y;
    this.emitter.emit(InputEvent.MouseMove, this.position, this.startPosition);
  }

  static _mouseUpEventHandler() {
    this.isMouseDown = false;
    this.emitter.emit(InputEvent.MouseUp, this.position, this.startPosition);
  }

  /**
   * @param {Touch} evt 
   */
  static getCanvasMousePos(evt) {
    let bound = this.canvas.getBoundingClientRect();
    this._tmpPos.x = (evt.clientX - bound.left) * this.canvas.width / bound.width;
    this._tmpPos.y = (evt.clientY - bound.top) * this.canvas.height / bound.height;
    return this._tmpPos;
  }

  /**
   * @param {string} event 
   * @param {(mouseX?: number, mouseY?: number, startMouseX?: number)} callback 
   */
  static registerEvent(event, callback) {
    this.emitter.on(event, callback);
  }

  /**
   * @param {string} event 
   * @param {(mouseX?: number, mouseY?: number, startMouseX?: number)} callback 
   */
  static removeEvent(event, callback) {
    this.emitter.off(event, callback)
  }
}

/**
 * @enum InputEvent 
 */
export const InputEvent = Object.freeze({
  MouseDown: "mousedown",
  MouseMove: "mousemove",
  MouseUp: "mouseup"
});