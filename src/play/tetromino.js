import { Point, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";

export class Tetromino{
    constructor(x, y, type, color, board){
        this.sprites = [];
        this.board = board;
        this.point = new Point();
        this.matrix = type;
        this.point.set(x, y);
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

}