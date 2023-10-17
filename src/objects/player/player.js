import { Container, Sprite, Texture } from "pixi.js";
import { Effect } from "../../effect/effec";
import { EffectPlayerDie } from "../../effect/effectPlayerDie";
import { Collider } from "../../physics/aabb/collider";
import { CollisionTag } from "../../physics/aabb/collisionTag";
import { CollisionEvent } from "../../physics/aabb/collissionEvent";

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
        this._initEffectPlayer();
        this._initEffectPlayerDie();
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

        


    }

    onCollider(){

    }

    _initEffectPlayer(){
        this.effect = new Effect()
        this.addChild(this.effect);
        this.effect.x = this.sprite.x - 25;
        this.effect.y = this.sprite.y
        this.effect.play();
    }

    _initEffectPlayerDie(){
        this.effectEffectPlayerDie = new EffectPlayerDie()
        this.addChild(this.effectEffectPlayerDie);
        this.effectEffectPlayerDie.x = this.sprite.x;
        this.effectEffectPlayerDie.y = this.sprite.y; 
    }

    ondie(){
        this.isdie = true;
        this.sprite.alpha = 0;
        this.effect.stop();
        this.effectEffectPlayerDie.play();
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
    
    rotation(){
        this.sprite.rotation += this.rotationSpeed;
    }
    
    updatePlayer(){
        if(this.isJumping){
            this.sprite.y -= this.jumbVelocity;
            this.jumbVelocity -= this.gravity;
            this.effect.x = this.sprite.x - 25;
            this.effect.y = this.sprite.y;
            this.effectEffectPlayerDie.x = this.sprite.x;
            this.effectEffectPlayerDie.y = this.sprite.y;
            this.effect.stop();
            this.rotation();
            if(this.jumbVelocity <=0){
                this.isJumping = false;
                this.isFalling = true;

            }
        }
        if(this.isFalling){
            this.sprite.y += this.jumbVelocity;
            this.jumbVelocity += this.gravity;
            this.effect.x = this.sprite.x - 25;
            this.effect.y = this.sprite.y
            this.effectEffectPlayerDie.x = this.sprite.x;
            this.effectEffectPlayerDie.y = this.sprite.y;
            this.sprite.rotation = this.degreesToRadians(this.degree);
            this.effect.play();
        }

    }


    registerEvents() {
        
        document.addEventListener("keydown", (e) => {
            if(this.isFalling || this.isJumping || this.isdie){
                return;
            }
            if(e.code === "Space") {
                this.degree += 180;
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
        if(this.isdie){
            return;
        }
        this.updatePlayer();
    }
}