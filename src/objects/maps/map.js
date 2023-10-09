import { Container, Sprite, Texture } from "pixi.js";
import mapData from "/assets/json/mapData.json";

export class Map extends Container {
    constructor() {
        super();
        this.platForm = [];
        this.spikes = [];
        this.squares = [];
        this.sawblade = [];
        this.pedestal = [];
        this.crushers = [];
        this.rectangles = [];
        this.mapVelocity = 5 ;
        this._initMap();
    }

    _initMap() {
        mapData.mapObjects.forEach(object => {
            if(object.type === "platform") {
                this._createPlatForm(object);
            }
            if(object.type === "spike") {
                this._createSpike(object);
            }
            if(object.type === "square") {
                this._createSquare(object);
            }
            if(object.type ==="sawblade") {
                this._createSawblade(object);
            }
            if(object.type ==="pedestal") {
                this._createPedestal(object);
            }
            if(object.type ==="crushers") {
                this._createCrushers(object);
            }
            if(object.type ==="rectangle") {
                this._createRectangle(object);
            }
            if(object.type ==="destination") {
                this._createDestination(object);
            }
        });
    }

    _createPlatForm(object) {
        let sprite = new Sprite(Texture.from("/assets/images/platforms.png"));
        this.addChild(sprite);
        this.platForm.push(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        sprite.anchor.set(0.5)
        return sprite;
    }

    _createSpike(object){
        let sprite = new Sprite(Texture.from("/assets/images/spike-16-27-56.png"));
        this.addChild(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        this.spikes.push(sprite);
        sprite.anchor.set(0.5);
        sprite.scale.set(1.3,1.3)
        sprite.rotation  = Math.PI/2
        return sprite;
    }

    _createSquare(object){
        let sprite = new Sprite(Texture.from("/assets/images/square.png"));
        this.addChild(sprite);
        this.squares.push(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        sprite.width = 55;
        sprite.height = 50;
        sprite.anchor.set(0.5)
        return sprite;
    }
    
    _createPedestal(object){
        let sprite = new Sprite(Texture.from("/assets/images/pedestal.png"));
        this.addChild(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        this.pedestal.push(sprite);
        sprite.width = 50;
        sprite.height = 100;
        sprite.anchor.set(0.5);
        return sprite;
    }

    _createSawblade(object){
        let sprite = new Sprite(Texture.from("/assets/images/sawblade.png"));
        this.addChild(sprite);
        this.sawblade.push(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        sprite.scale.y = 1.2;
        sprite.anchor.set(0.5)
        return sprite;
    }

    _createSawblade2(object){
        let sprite = new Sprite(Texture.from("/assets/images/sawblade2.png"));
        this.addChild(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        return sprite;
    }

    _createRectangle(object){
        let sprite = new Sprite(Texture.from("/assets/images/rectangle.png"));
        this.addChild(sprite);
        this.rectangles.push(sprite)
        sprite.x = object.x;
        sprite.y = object.y;
        return sprite;
    }

    _createCrushers(object){
        let sprite = new Sprite(Texture.from("/assets/images/crusher.png"));
        this.addChild(sprite);
        this.crushers.push(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        sprite.scale.y = 0.6;
        return sprite;
    }
    _createDestination(object){
        let sprite = new Sprite(Texture.from("/assets/images/destination.png"));
        this.addChild(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        return sprite;
    }

    update(){
        if(this.isPaused){
            return;
        }
        this.x -= this.mapVelocity;
        // this._checkOutScreen();
    }

    // _checkOutScreen(){
    //     if(this.grounds[0].x < -this.grounds[0].width){
    //         this.destroy(this.grounds[0]);
    //         this.grounds.splice(0, 1);
    //     }
    // }
    pause(){
        this.isPaused= true;
    }

    resume(){
        this.isPaused = false;
        // console.log(2)
    }

}