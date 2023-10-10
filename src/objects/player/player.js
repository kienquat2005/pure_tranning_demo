import { Container, Sprite, Texture } from "pixi.js";

export class Player extends Container {
    constructor() {
        super("player");
        this.jumbVelocity = 12;
        this.gravity = 7 ;
        this.isJumping = false;
        this.isFalling = true;
        this.degree = 0;
        this.rotationSpeed = 0.070;
        this.isdie = false;
        this._initSprite();
        this.registerEvents();
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("/assets/images/player.png"));
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
        this.width = 1.7;
        this.height = 1.7;
        this.pivot.set(0.5);

    }
    ondie(){
        this.isdie = true;
    }

    jumb() {
        if(this.isFalling) {
            return;
        }
        this.degree += 90;
        this.isJumping = true;
        setTimeout(() => {
            this.isJumping = false;
            this.isFalling = true;
        }, 350)
    }

    fall() {
        this.isFalling = true;
    }

    registerEvents() {
        document.addEventListener("keydown", (e) => {
            if(this.isdie){
                return;
            }
            if(e.code === "Space") {
                this.jumb();
            }
        })
    }

    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

    update() {
        if(this.isFalling) {
            this.y += this.gravity;
        }
        if(this.isJumping) {
            this.rotation += this.rotationSpeed;
            this.y -= this.jumbVelocity;
        } else {
             this.rotation = this.degreesToRadians(this.degree);
        }
    }
}