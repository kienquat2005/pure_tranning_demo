import { Tween } from "@tweenjs/tween.js";
import { Point, Sprite, Texture } from "pixi.js";
import { Effect } from "../effect/effect";
import { Game } from "../game";
import { GameConstant } from "../gameconstant";

export class Tetromino{
    constructor(x, y, type, color, board){
        this.sprites = [];
        this.board = board;
        this.point = new Point();
        this.matrix = type;
        this.point.set(x, y);
        this.color = color;
        this.createTetromino(type,color);
    }
    
    createTetromino(type,color){
        const startCol = this.point.x - Math.floor(type[0].length / 2);
        const startRow = this.point.y - Math.floor(type.length / 2) < 0 ? 0 : this.point.y - Math.floor(type.length / 2);
        for(let colum = 0; colum < type.length; colum++) {
            for(let row = 0; row < type[colum].length; row++) {
                if(type[colum][row] === 1 ) {
                    let sprite = new Sprite(Texture.from(color));
                    this.board.addChild(sprite);
                    this.sprites.push(sprite);
                    sprite.width = GameConstant.TETROMIO_SPACE;
                    sprite.height = GameConstant.TETROMIO_SPACE;
                    const boardRow = startRow + colum;
                    const boardCol = startCol + row;
                    sprite.x = boardCol * GameConstant.TETROMIO_SPACE;
                    sprite.y = boardRow * GameConstant.TETROMIO_SPACE;
                    sprite.col = boardCol;
                    sprite.row = boardRow;
                }
            }
        }
    }

    updatePos(type){
        let newArr = [];
        const startCol = this.point.x - Math.floor(type[0].length / 2);
        const startRow = this.point.y - Math.floor(type.length / 2) < 0 ? 0 : this.point.y - Math.floor(type.length / 2);
        for(let colum = 0; colum < type.length; colum++) {
            for(let row = 0; row < type[colum].length; row++) {
                if(type[colum][row] === 1 ) {
                    let sprite = this.sprites.pop();
                    newArr.push(sprite);
                    const boardRow = startRow + colum;
                    const boardCol = startCol + row;
                    sprite.x = boardCol * GameConstant.TETROMIO_SPACE;
                    sprite.y = boardRow * GameConstant.TETROMIO_SPACE;
                    sprite.col = boardCol;
                    sprite.row = boardRow;
                }
            }
        }
        this.sprites = newArr;
        this.matrix = type; 
    }
    _initEffect(){
        this.effect = new Effect();
        this.addChild(this.effect);
    }

    onDrop(){
        this.sprites.forEach(sprite => {
            new Tween(sprite)
            .to({alpha : 0.5},100)
            .repeat(1) 
            .onComplete(()=>{
            })
            .yoyo(true)
            .start(Game.currentTime)
        });
    }
    onMoveDown(){
        this.sprites.forEach(sprite =>{
            new Tween(sprite)
            .to({alpha: 0},100)
            .repeat(1)
            .onComplete(()=>{
                // console.log(1);
            })
            .yoyo(true)
            .start(Game.currentTime)
        })
    }
    onMoveSound(){
        const audio = new Howl({
            src:"/assets/sound/move.mp3",
            volume: 0.3,
        })
        audio.play();
    }
    onRotationSound(){
        const audio = new Howl({
            src:"/assets/sound/rotation.mp3",
            volume: 0.3
        })
        audio.play();
    }
}