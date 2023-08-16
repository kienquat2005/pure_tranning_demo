import { Tween } from '@tweenjs/tween.js';
import { Container, Filter, FilterState, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { LevelData } from '../level/levelData';


export class Spikes extends Container{
    constructor(){
        super();
        this.spacing = 50;
        this.spikeRightLenght = 2;
        this.spikeup = [] ;
        this.spikedow = [] ;
        this.spikeLefts = [];
        this.spikeRights = [];
        this.createSpikesup();
        this.createSpikesdow();
        this.createSpikesleft();
        this.createSpikesright();
        this.updateTotalSikeRight();

        
    }
    createSpikesup(){
        for(let i = 0 ; i < 7 ; i++ ){
            let spikesup = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesup.x = i * 35 + i * this.spacing - 30 ;
            spikesup.scale.y = -1
            spikesup.y = 80;
            this.addChild(spikesup)
            spikesup.tint = 0x8f8e88;
            this.spikeup.push(spikesup)

        }
    }
    createSpikesdow(){
        for(let i = 0 ; i < 7 ; i++ ){
            let spikesdow = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesdow.x = i *40 + i * this.spacing - 30 ;
            // spikesup.scale.y = -1
            spikesdow.y = GameConstant.GAME_HEIGHT - 80 ;
            this.addChild(spikesdow);
            spikesdow.tint = 0x8f8e88;
            this.spikedow.push(spikesdow);
        }
    }
    createSpikesleft(){
        for ( let i = 0 ; i < GameConstant.TOTALSPIKE ; i++ ){
            let spikesLeft = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesLeft.y = i * 80 + i *this.spacing ;
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
        for ( let i = 0 ; i < GameConstant.TOTALSPIKE ; i++ ){
            let spikesRight = new Sprite(Texture.from("/assets/images/spikes.png"));
            spikesRight.y = i * 80 + i *this.spacing ;
            spikesRight.x = 675;
            spikesRight.rotation =  - Math.PI/2;
            let position = {x : spikesRight.x, y : spikesRight.y};
            spikesRight.tint = 0x8f8e88;
            this.addChild(spikesRight)
            this.spikeRights.push(spikesRight);
            spikesRight.tweenShow = new Tween({x: spikesRight.x}).to({x: "-100"}, 100).onUpdate((obj)=> {
                spikesRight.x = obj.x;
            });
            spikesRight.tweenHide = new Tween({x: spikesRight .x}).to({x: "+100"}, 100).onUpdate((obj)=> {
                spikesRight.x = obj.x; 
            });
        }
    }

    ramdomShowSpikeLeft(){
        let spikesvisible = this.ramdom(LevelData.data.min,LevelData.data.max);
        let index = [0,1,2,3,4,5,6,7,8]
        let aray = this.uniqueElementsRandom(index, spikesvisible);
        this.spikeLefts.forEach((spike, i) => {
            spike.visible = false;
            aray.forEach(index => {
                if(index === i){
                    spike.visible = true;
                }
            });
        });
        console.log(aray);
    }

    ramdomShowSpikeRight(){
        let spikesvibleRinght = this.ramdom(LevelData.data.min,LevelData.data.max);
        let index = [0,1,2,3,4,5,6,7,8]
        let aray = this.uniqueElementsRandom(index,spikesvibleRinght);
        this.spikeRights.forEach((spikeRight, i)=>{
            spikeRight.visible = false;
            aray.forEach(index =>{
                if(index === i){
                    spikeRight.visible = true;
                }
            })
        })

    }

    uniqueElementsRandom(arr, count) {
        // Sử dụng Set để loại bỏ các phần tử trùng lặp
        const uniqueArr = Array.from(new Set(arr));
        
        // Tạo mảng kết quả
        const resultArr = [];
        
        // Lấy ngẫu nhiên các phần tử trong mảng uniqueArr cho đến khi đủ số lượng cần thiết
        while (resultArr.length < count && uniqueArr.length > 0) {
          const randomIndex = Math.floor(Math.random() * uniqueArr.length);
          const randomElement = uniqueArr.splice(randomIndex, 1)[0];
          resultArr.push(randomElement);
        }
        
        return resultArr;
      }

    ramdom(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    updateTotalSikeRight(){
    
    }

}