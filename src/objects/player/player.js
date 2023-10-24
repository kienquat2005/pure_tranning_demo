import { Container, Sprite, Texture } from "pixi.js";
import { Effect } from "../../effect/effect";
import { EffectPlayerDie } from "../../effect/effectPlayerDie";
import { FireworkEffect } from "../../effect/fireWorkEffect";
import { GameConstant } from "../../gameconstant";

export class Player extends Container {
    constructor() {
        super();
        this.jumbVelocity = GameConstant.JUMP_VELOCIRY;
        this.gravity = 7.5;
        this.isJumping = false;
        this.isFalling = true;
        this.degree = 0;
        this.rotationSpeed = 0.2;
        this.isdie = false;
        this._initSprite();
        this._initEffect();
        this.registerEvents();
        console.log(GameConstant.PLAYER_GRAVITI)
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

    _initEffect(){
        this.effect = new Effect();
        this.addChild(this.effect);
        this.effect.x = this.sprite.x - 25;
        this.effect.y = this.sprite.y
        this.effect.play();

        this.effectEffectPlayerDie = new EffectPlayerDie();
        this.addChild(this.effectEffectPlayerDie);
        this.effectEffectPlayerDie.x = this.sprite.x;
        this.effectEffectPlayerDie.y = this.sprite.y;

        this.fireworkEffect = new FireworkEffect();
        this.fireworkEffect.x = this.sprite.x;
        this.fireworkEffect.y = this.sprite.y;
        this.addChild(this.fireworkEffect)
    }

   

    ondie(){
        this.isdie = true;
        this.sprite.alpha = 0;
        this.effect.stop();
        this.effectEffectPlayerDie.play();
    }

    jumb(){
        if(this.isFalling){
            return;
        }
        this.degree += 180;
        this.isJumping = true;
        setTimeout(() => {
            this.isJumping = false;
            this.isFalling = true;
        }, 240 )
    }
    fall(){
            this.isFalling = true; 
    }
    
    rotation(){
        this.sprite.rotation += this.rotationSpeed;
    }
    
    updatePlayer(){
        if(this.isJumping){
            this.sprite.y -= this.jumbVelocity; 
            // this.effect.x = this.sprite.x - 25;
            // this.effect.y = this.sprite.y;
            this.effectEffectPlayerDie.x = this.sprite.x;
            this.effectEffectPlayerDie.y = this.sprite.y;
            this.rotation();
            this.effect.stop();
        }
            else{
                this.sprite.rotation = this.degreesToRadians(this.degree)
            }
    
        if(this.isFalling){
            this.sprite.y += this.gravity;
            this.effect.x = this.sprite.x - 25;
            this.effect.y = this.sprite.y
            this.effectEffectPlayerDie.x = this.sprite.x;
            this.effectEffectPlayerDie.y = this.sprite.y;
            this.effect.play();
        }
    }


    registerEvents() {
        
        document.addEventListener("keydown", (e) => {
            if(this.isFalling || this.isJumping || this.isdie){
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
        if(this.isdie){
            return;
        }
        this.updatePlayer();
    }
}