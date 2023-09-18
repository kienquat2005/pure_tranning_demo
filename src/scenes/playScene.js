import { Container, UPDATE_PRIORITY } from "pixi.js";
import { Board } from "../play/board";


export class PlayScene extends Container{
    constructor(){
        super();
        this._initBoard();
        this.dt = 0;
        
    }
    _initBoard(){
      this.board = new Board();
      this.addChild(this.board);
    }
    update(){
      this.board.update();
    }
}




    