import { Container, Sprite, Texture } from "pixi.js";

export class Player extends Container {
    constructor() {
        super("player");
        this.jumbVelocity = 1.2;
        this.gravity = 0.6;
        this.isJumping = false;
        this.isFalling = true;
        this.degree = 0;
        this.rotationSpeed = 0.18;
        this.isdie = false;
        this._initSprite();
        this.registerEvents();
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("/assets/images/player.png"));
        this.addChild(this.sprite);
        this.sprite.anchor.set(0.5);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.sprite.x = 250
        this.sprite.y = 580;
        this.pivot.set(0.5);

    }
    ondie(){
        this.isdie = true;
    }

    jumb(){
        if(!this.isJumping && !this.isFalling){
            this.isJumping = true;
            this.jumbVelocity = 10;
        }
    }
    fall(){
        if(!this.isJumping){
            this.isFalling = true; 
        }
    }
    
    updatePlayer(){
        if(this.isJumping){
            this.sprite.y -= this.jumbVelocity;
            this.jumbVelocity -= this.gravity;
            this.sprite.rotation += this.rotationSpeed;
            if(this.jumbVelocity <=0){
                this.isJumping = false;
                this.isFalling = true;
            }
        }
        if(this.isFalling){
            this.sprite.y += this.jumbVelocity;
            this.jumbVelocity += this.gravity;
            this.sprite.rotation = this.degreesToRadians(this.degree);
        }

    }


    registerEvents() {
        document.addEventListener("keydown", (e) => {
            if(this.isdie){
                return;
            }
            this.degree += 180;
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
        this.updatePlayer();
    }
}