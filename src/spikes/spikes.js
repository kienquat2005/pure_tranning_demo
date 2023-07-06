import { Tween } from '@tweenjs/tween.js';
import { Container, Filter, FilterState, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";


export class Spikes extends Container{
    constructor(){
        super();
        this.spacing = 50;
        this.spikeup = []
        this.spikedow = []
        this.spikeLefts = [];
        this.spikeRights = [];
        this.createSpikesup();
        this.createSpikesdow();
        this.createSpikesleft();
        this.createSpikesright();
        
    }
    createSpikesup(){
        for(let i = 0 ; i < 7 ; i++ ){
            this.spikesup = new Sprite(Texture.from("/assets/images/spikes.png"));
            this.spikesup.x = i * 35 + i * this.spacing - 30 ;
            this.spikesup.scale.y = -1
            this.spikesup.y = 80;
            this.addChild(this.spikesup)
            this.spikesup.tint = 0x8f8e88;
            this.spikeup.push(this.spikesup)

        }
    }
    createSpikesdow(){
        for(let i = 0 ; i < 7 ; i++ ){
            this.spikesdow = new Sprite(Texture.from("/assets/images/spikes.png"));
            this.spikesdow.x = i *40 + i * this.spacing -30 ;
            // this.spikesup.scale.y = -1
            this.spikesdow.y = GameConstant.GAME_HEIGHT- 80 ;
            this.addChild(this.spikesdow);
            this.spikesdow.tint = 0x8f8e88;
            this.spikedow.push(this.spikesdow);
        }
    }
    createSpikesleft(){
        for ( let i = 0 ; i < 5 ; i++ ){
            let spikesLeft = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesLeft.y = i * 80 + i *this.spacing + 300;
            spikesLeft.x = -160;
            spikesLeft.rotation = Math.PI/2;
            let position = {x : spikesLeft.x, y : spikesLeft.y};
            this.addChild(spikesLeft);
            spikesLeft.tint = 0x8f8e88;
            this.spikeLefts.push(spikesLeft);
            spikesLeft.tweenShow = new Tween({x: spikesLeft.x}).to({x: "+100"}, 100).onUpdate((obj)=> {
                spikesLeft.x = obj.x;
            });
            spikesLeft.tweenHide = new Tween({x: spikesLeft.x}).to({x: "-100"}, 100).onUpdate((obj)=> {
                spikesLeft.x = obj.x;
            }); 
        }
    }
    createSpikesright(){
        for ( let i = 0 ; i < 5 ; i++ ){
            let spikesRight = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesRight.y = i * 80 + i *this.spacing + 300;
            spikesRight.x = 675;
            spikesRight.rotation =  - Math.PI/2;
            let position = {x : spikesRight.x, y : spikesRight.y};
            this.addChild(spikesRight);
            spikesRight.tint = 0x8f8e88;
            this.spikeRights.push(spikesRight);
            spikesRight.tweenShow = new Tween({x: spikesRight.x}).to({x: "-100"}, 100).onUpdate((obj)=> {
                spikesRight.x = obj.x;
            });
            spikesRight.tweenHide = new Tween({x: spikesRight .x}).to({x: "+100"}, 100).onUpdate((obj)=> {
                spikesRight.x = obj.x; 
            });
        }
    }
}