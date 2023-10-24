import tween, { Tween } from "@tweenjs/tween.js";
import { Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameconstant";
import mapData from "/assets/json/mapData.json";

export class Map extends Container {
    constructor() {
        super();
        this.platForms = [];
        this.spikes = [];
        this.squares = [];
        this.sawblade = [];
        this.pedestal = [];
        this.crushers = [];
        this.rectangles = [];
        this.smiles = [];
        this.pillars = [];
        this.destinations = [];
        this.mapVelocity = 7.5;
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
            if(object.type ==="smile") {
                this._createSmile(object)
            }
            if(object.type ==="pillar"){
                this._createPillar(object);
            }
        });
    }

    _createPlatForm(object) {
        let platForm = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/platforms.png"));
        platForm.addChild(sprite);
        this.addChild(platForm)
        this.platForms.push(platForm);
        platForm.x = object.x;
        platForm.y = object.y;
        platForm.pivot.set(0.5)
        return platForm;
    }

    _createSpike(object){
        let spike = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/spike-16-27-56.png"));
        spike.addChild(sprite);
        this.addChild(spike)
        spike.x = object.x;
        spike.y = object.y;
        this.spikes.push(spike);
        spike.pivot.set(0.5);
        sprite.scale.set(1.3,1.3);
        spike.rotation = Math.PI/2
        return spike;
    }

    _createSquare(object){
        let square = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/square.png"));
        square.addChild(sprite);
        this.addChild(square);
        this.squares.push(square);
        square.x = object.x;
        square.y = object.y;
        square.pivot.set(0.5);
        square.scale.set(0.65);
        square.name = "square";
        return square;
    }
    
    _createPedestal(object){
        let pedestal = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/pedestal.png"));
        pedestal.addChild(sprite);
        this.addChild(pedestal);
        pedestal.x = object.x;
        pedestal.y = object.y;
        this.pedestal.push(pedestal);
        pedestal.scale.set(0.7);
        pedestal.pivot.set(0.5);
        return pedestal;
    }

    _createSawblade(object){
        let sawBlade = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/sawblade.png"));
        sawBlade.addChild(sprite);
        this.addChild(sawBlade);
        this.sawblade.push(sawBlade);
        sawBlade.x = object.x;
        sawBlade.y = object.y;
        sawBlade.scale.y = 1.2;
        sawBlade.pivot.set(0.5);
        return sawBlade;
    }

    _createSawblade2(object){
        let sprite = new Sprite(Texture.from("/assets/images/sawblade2.png"));
        this.addChild(sprite);
        sprite.x = object.x;
        sprite.y = object.y;
        return sprite;
    }

    _createRectangle(object){
        let recTangLe = new Container();
        let sprite = new Sprite(Texture.from("/assets/images/rectangle.png"));
        recTangLe.addChild(sprite);
        this.addChild(recTangLe);
        this.rectangles.push(recTangLe)
        recTangLe.x = object.x;
        recTangLe.y = object.y;
        recTangLe.pivot.set(0.5)
        recTangLe.scale.set(0.8)
        return recTangLe;
    }

    _createCrushers(object){
        let cruSher = new Container()
        let sprite = new Sprite(Texture.from("/assets/images/crusher.png"));
        cruSher.addChild(sprite)
        this.addChild(cruSher);
        this.crushers.push(cruSher);
        cruSher.x = object.x;
        cruSher.y = object.y;
        cruSher.scale.y = 0.6;
        cruSher.pivot.set(0.5);
        return cruSher;
    }
    _createDestination(object){
        let destination = new Container()
        let sprite = new Sprite(Texture.from("/assets/images/destination.png"));
        destination.addChild(sprite);
        this.addChild(destination);
        destination.x = object.x;
        destination.y = object.y;
        this.destinations.push(destination);
        destination.pivot.set(0.5);
        return destination;
    }

    _createSmile(object){
        let smile = new Container()
        let sprite = new Sprite(Texture.from("/assets/images/love.png"));
        sprite.anchor.set(0.5);
        smile.addChild(sprite);
        this.addChild(smile);
        this.smiles.push(smile);
        smile.x = object.x;
        smile.y = object.y;
        smile.pivot.set(0.5);
        smile.width = 0.5;
        smile.height = 0.5;
        this.smiles.forEach(smiLe =>{
            new Tween(smiLe.scale)
            .to({x:0.2 , y: 0.2},300)
            .yoyo(true)
            .repeat(Infinity)
            .start(Game.currentTime);
        })
        return smile;
    }

    _createPillar(object){
        let pillar = new Container()
        let sprite = new Sprite(Texture.from("/assets/images/pillar.png"));
        pillar.addChild(sprite);
        this.addChild(pillar);
        this.pillars.push(pillar);
        pillar.x = object.x;
        pillar.y = object.y;
        pillar.pivot.set(0.5);
        pillar.width = 1.5;
        pillar.height = 1.5;
        return pillar;
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