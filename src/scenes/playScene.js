import { Container, UPDATE_PRIORITY } from "pixi.js";
import { Board, BoardEvent } from "../play/board";
import { Gamelose, Gamelost } from "../play/gamelost";
import { Score } from "../play/score";


export class PlayScene extends Container{
    constructor(){
        super();
        this._initBoard();
        this._initScore();
        this._initGameOver();
        this.dt = 0;
        
    }

    _initBoard(){
      this.board = new Board();
      this.addChild(this.board);

      this.board.on(BoardEvent.ROWCLEARED, (rowClear) => {
          let score = this.calculateScore(rowClear);
          this.updateScore(score);
      });
      this.board.on(BoardEvent.LOSE, ()=>{
        this.isGameOver(this.board.arrBoard);
      })
    }

    _initScore(){
      this.score = new Score();
      this.addChild(this.score);
    }

    calculateScore(rowCount){
      const pointPerRow = 100;
      const bonusMultiplier = 1.5;
      let score = 0;
      score += rowCount * pointPerRow;
      if(rowCount > 1){
          const bonusPoint =  Math.floor((rowCount - 1) * pointPerRow * bonusMultiplier);
          score += bonusPoint;
      }
      return score;
    }

    updateScore(score){
      this.score.scores += score;
      this.score.score.text = this.score.scores;
    }

    _initGameOver(){
      this.gameOver = new Gamelose();
      this.addChild(this.gameOver);
      this.gameOver.visible = false;
    }
    isGameOver(board){
      for( let col = 0; col < board[0].length; col++){
          if(board[0][col] === 1){
              this.board.onLose();
              this.gameOver.visible = true;
          }
      }
  }
    update(){
      this.board.update();
    }
}




    