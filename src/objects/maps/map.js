import tween, { Tween } from "@tweenjs/tween.js";
import { Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import { CruSher } from "./cruSher/curSher";
import { Destination } from "./desTination/destination";
import { Heart } from "./heart/heart";
import { Pedestal } from "./pedestal/pedestal";
import { Pillar } from "./pillar/pillar";
import { PlatForm } from "./platForm/platFrom";
import { RecTangLe } from "./recTangLe/retangLe";
import { SawBlade } from "./sawBlade/sawBlade";
import { Spike } from "./spike/spike";
import { Square } from "./square/square";
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
        this.hearts = [];
        this.pillars = [];
        this.mapVelocity = 7;
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
            if(object.type ==="heart") {
                this._createHeart(object)
            }
            if(object.type ==="pillar"){
                this._createPillar(object);
            }
        });
    }

    _createPlatForm(object) {
        let platForm = new PlatForm()
        this.addChild(platForm);
        this.platForms.push(platForm);
        platForm.x = object.x;
        platForm.y = object.y;
        platForm.pivot.set(0.5)
        return platForm;
    }

    _createSpike(object){
        let spike = new Spike();
        spike.x = object.x;
        spike.y = object.y;
        this.addChild(spike)
        spike.pivot.set(0.5);
        spike.scale.set(1.5,1.5)
        spike.rotation = Math.PI/2
        return spike;

    }

    _createSquare(object){
        let square = new Square();
        this.addChild(square)
        square.x = object.x;
        square.y = object.y;
        square.pivot.set(0.5);
        square.scale.set(0.65);
        return square;
    }
    
    _createPedestal(object){
        let pedestal = new Pedestal();
        this.addChild(pedestal);
        pedestal.x = object.x;
        pedestal.y = object.y;
        this.pedestal.push(pedestal);
        pedestal.scale.set(0.7);
        pedestal.pivot.set(0.5);
        return pedestal;
    }

    _createSawblade(object){
        let sawBlade = new SawBlade();
        this.addChild(sawBlade);
        this.sawblade.push(sawBlade);
        sawBlade.x = object.x;
        sawBlade.y = object.y;
        sawBlade.scale.y = 1.2;
        sawBlade.pivot.set(0.5);
        return sawBlade;
    }

    _createRectangle(object){
        let recTangLe = new RecTangLe();
        this.addChild(recTangLe);
        this.rectangles.push(recTangLe)
        recTangLe.x = object.x;
        recTangLe.y = object.y;
        recTangLe.pivot.set(0.5)
        return recTangLe;
    }

    _createCrushers(object){
        let cruSher = new CruSher()
        this.addChild(cruSher);
        cruSher.x = object.x;
        cruSher.y = object.y;
        cruSher.scale.y = 0.6;
        cruSher.pivot.set(0.5);
        return cruSher;
    }
    _createDestination(object){
        let destination = new Destination()
        this.addChild(destination);
        destination.x = object.x;
        destination.y = object.y;
        destination.pivot.set(0.5);
        return destination;
    }

    _createHeart(object){
        let heart = new Heart()
        this.addChild(heart);
        heart.x = object.x;
        heart.y = object.y;
        heart.pivot.set(0.5);
        this.hearts.push(heart);
        heart.width = 0.5;
        heart.height = 0.5;
        this.hearts.forEach(heart =>{
            new Tween(heart.scale)
            .to({x:0.2 , y: 0.2},300)
            .yoyo(true)
            .repeat(Infinity)
            .start(Game.currentTime);
        })
        return heart;
    }

    _createPillar(object){
        let pillar = new Pillar();
        this.pillars.push(pillar);
        pillar.x = object.x;
        pillar.y = object.y;
        pillar.pivot.set(0.5);
        pillar.width = 1.5;
        pillar.height = 1.5;
        this.addChild(pillar);
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
    }

}