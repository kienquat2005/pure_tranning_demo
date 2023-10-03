import { Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameconstant";

export class Base extends Container{
    constructor(){
        super();
        this.bases = [];
        this.basevelocity = 3;
        this._initBase1();
        this._initBase2();
    }

    _initBase1(){
        this.base1 = new Sprite(Texture.from("/assets/images/base.png"));
        this.addChild(this.base1);
        this.base1.y = 540;
        this.base1.width = GameConstant.GAME_WIDTH;
        this.bases.push(this.base1)
    }

    _initBase2(){
        this.base2 = new Sprite(Texture.from("/assets/images/base.png"));
        this.addChild(this.base2);
        this.base2.width = GameConstant.GAME_WIDTH;
        this.base2.x = 710;
        this.base2.y = 540;
        this.bases.push(this.base2)
    }
    
    baseColliderWall(){
        this.bases.forEach((base)=>{
            base.x-= this.basevelocity
            {
                if(base.x <= -720){
                    base.x = 700;
                }
            }
        })
    }
    update(){
        this.baseColliderWall();
    }

}