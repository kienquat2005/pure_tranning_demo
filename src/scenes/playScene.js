import { Container } from "pixi.js";
import { Board } from "../play/board";

export class PlayScene extends Container{
    constructor(){
        super();
        this._initBoard();
    }
    _initBoard(){
        this.board = new Board()
        this.addChild(this.board);
    }
    update(dt){
        
    }
}