
import { Container, UPDATE_PRIORITY } from "pixi.js";
import { Board, BoardEvent } from "../play/board";
import { Gamelose, Gamelost } from "../play/gamelost";
import { Score } from "../play/score";
import { Howl } from "howler";
import { BackGround } from "../ui/background";

export class PlayScene extends Container{
    constructor(){
        super();
        this.resultScore = 0;
        this._initBackGround();
        this._initScore();  
        this._initBoard();
        this.sound();
        this._initGameOver();
        this.dt = 0;
    }

    _initBackGround(){
      this.bg = new BackGround();
      this.addChild(this.bg);
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
      });
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

    _initGameOver(){
      this.gameOver = new Gamelose();
      this.addChild(this.gameOver);
      this.gameOver.visible = false;
    }

    updateScore(score){
      this.score.scores += score;
      this.score.score.text = this.score.scores;
      this.gameOver.resultScore = this.score.scores;
      this.gameOver.showScores.text = this.gameOver.resultScore;
    }

    isGameOver(board){
      for( let col = 0; col < board[0].length; col++){
          if(board[0][col] === 1){
              this.board.onLose();
              this.gameOver.visible = true;
              this.gameOver.onSoundGameOver();
              this.audio.stop();
          }

      }
    }
    sound(){
      this.audio = new Howl({
        src: "/assets/sound/Tetris.mp3",
        autoplay: true,
        loop: false,
        volume: 0.8,
      })
      this.audio.play();
    }

    update(){
      this.board.update();
    }

    pause(){
      this.board.pause();
    }

    resume(){
      this.board.resume();
    }
}




    