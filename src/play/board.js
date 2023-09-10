import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameconstant";
import { Tetromino } from "./tetromino";


export class Board extends Container{
    constructor(){
        super();
        this.currentTetromino = null;
        this.arrBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        
        this.pointX = 3;
        this.pointY = 3;
        this.matrix = 
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ]
        this.newArr = this.matrix;
        this._initBoard();
        this._initFirstTetromino();
        this.registerEvent();
    }

    _initBoard(){
        for ( let i = 0; i < this.arrBoard.length; i++){
            for(let j = 0; j < this.arrBoard[i].length; j++){ 
                if(this.arrBoard[i][j] === 0){
                    let square = new Graphics()
                        square.beginFill(0x000000);
                        square.lineStyle(2, 0xffffff);
                        square.drawRect(0, 0, 50, 50);
                        square.endFill();
                        this.addChild(square);
                        square.x = j * GameConstant.SQUARE_SPACE;
                        square.y = i * GameConstant.SQUARE_SPACE;
                }
            }
        }
    }

    _initFirstTetromino(){
        let tetromino = new Tetromino(5, 0, this.matrix);
        this.addTetromino(tetromino, 5, 0);
        this.currentTetromino = tetromino;
        console.log(this.arrBoard);
    }
    
    moveLeft() {
        this.currentTetromino.point.x -= 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
            this.currentTetromino.updatePos(this.currentTetromino.matrix);
        } else {
            this.currentTetromino.point.x += 1;
        }
    }

    moveRight(){
        this.currentTetromino.point.x += 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
        } else {
            this.currentTetromino.point.x -= 1;
        } 
        this.currentTetromino.updatePos(this.currentTetromino.matrix);
    }

    moveDown(){
        this.currentTetromino.y += 1;
    }
    

    rotateMatrix(matrix) {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
        const newMaxtrix = [];
      
        // Loop through the original matrix and populate the rotated matrix
        for (let i = 0; i < numCols; i++) {
            let newRows = [];
          for (let j = numRows - 1; j >= 0; j--) {
            newRows.push(matrix[j][i]);
          }
          newMaxtrix.push(newRows);
        }
      
        return newMaxtrix;
      } 

    rotation(){
        this.newArr = this.rotateMatrix(this.newArr);
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.newArr, point.x, point.y)){
            this.currentTetromino.updatePos(this.newArr, this.currentTetromino.point.x, this.currentTetromino.point.y);
        }
    }
    
    registerEvent() {
        document.addEventListener("keydown", (e) => {
            if(e.code === "KeyA") {
                this.moveLeft();
            }
            else if(e.code ==="KeyD"){
                this.moveRight();
            }
            else if (e.code ==="KeyW"){
                this.rotation();
            }
        })
    }

    isValidMove(tetrimino, x, y) {
        const startCol = x - Math.floor(tetrimino[0].length / 2);
        const startRow = y - Math.floor(tetrimino.length / 2) < 0 ? 0 : y - Math.floor(tetrimino.length / 2);
        // Check if the Tetrimino is within the grid boundaries and doesn't collide with other blocks
        for (let row = 0; row < tetrimino.length; row++) {
            for (let col = 0; col < tetrimino[row].length; col++) {
                if (tetrimino[row][col] === 1) {
                    const gridY = startRow + row;
                    const gridX = startCol + col;
                    // console.log(gridX, gridY);
                    if (gridX < 0 || gridX >= this.arrBoard[0].length || gridY >= this.arrBoard.length) {
                        return false;
                    }
    
                    // Check if the move collides with existing blocks in the grid
                    if (gridY < 0 && this.arrBoard[gridY][gridX]) {
                        return false;
                    }
                }
            }
        }
    
        return true;
    }


    addTetromino(tetromino, x, y){
        this.addChild(tetromino);
        let rows = tetromino.matrix.length;
        let cols = tetromino.matrix[0].length;
        const startCol = x - Math.floor(tetromino.matrix[0].length / 2);
        const startRow = y - Math.floor(tetromino.matrix.length / 2) < 0 ? 0 : y - Math.floor(tetromino.matrix.length / 2);
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                const boardRow = startRow + i;
                const boardCol = startCol + j;
                this.arrBoard[boardRow][boardCol] = tetromino.matrix[i][j];
            }
        }
    }


    // updateTetrominoOnBoard(tetromino, x, y){

    // }
}