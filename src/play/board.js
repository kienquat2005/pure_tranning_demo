
import { Easing, Tween } from '@tweenjs/tween.js';
import { Color, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Game } from '../game';
import { GameConstant } from "../gameconstant";
import { Gamelost } from "./gamelost";
import { Score } from "./score";
import { Tetromino } from "./tetromino";

export const BoardEvent = Object.freeze({
    ROWCLEARED: "board:clearrows",
    LOSE: "lose"

});

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

        this.islose = false;
        this.pointX = 0;
        this.pointY = 0;
        this.dt = 0;
        this.matrix = {
            tetrominoT:{
                shape:[
                [0, 1, 0,],
                [1, 1, 0,],
                [0, 1, 0,]
            ],
                color:"/assets/images/tileBlu.png",
            },
            tetrominoL:{
                shape:[
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1]
                ],
                color: "/assets/images/tileYellow.png",
            },
            tetriminoO:{
                shape:[
                    [1, 1],
                    [1, 1]
                ],
                color:"/assets/images/tileGreen.png",
            },
            tetriminoJ:{
                shape:[
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                color:"/assets/images/tileGrey.png",
            },
            tetriminoZ:{
                shape:
                    [
                        [1, 1, 0],
                        [0, 1, 1],
                        [0, 0, 0]
                    ],
                color: "/assets/images/tilePurple.png",
            },
            tetriminoS:{
                shape:
                    [
                        [0, 1, 1],
                        [1, 1, 0],
                        [0, 0, 0]
                    ],
                color: "/assets/images/tilerred.png",
            },
            tetriminoL:{
                shape:[
                    [1, 0],
                    [1, 0],
                    [1, 0],
                    [1, 0]
                    ],
                color:"/assets/images/tileTurquoise.png",
            }
        }
            
        this.pices = [];
        this._initBoard();
        this._initFirstTetromino();
        this.registerEvent();
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite);
        this.position.set(100);
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
        let tetromino = new Tetromino(5, 0, this.matrix.tetrominoT.shape,this.matrix.tetrominoT.color, this);
        this.currentTetromino = tetromino;
        this.newArr = tetromino.matrix;
    }

    spawnNewTetromino(){
        let arr = Object.values(this.matrix);
        let matrix = this.getRamdomIndex(arr);
        let tetrimino = new Tetromino(5, 0, matrix.shape, matrix.color, this);
        this.currentTetromino = tetrimino;
        this.newArr = tetrimino.matrix;
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite);
    }
    getRamdomIndex(array){
        const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
    }

    onLose(){
        this.islose = true;
    }
        
    moveLeft() {
        if(this.islose){
            return;
        }
        this.currentTetromino.point.x -= 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
            this.currentTetromino.updatePos(this.currentTetromino.matrix);
        } else {
            this.currentTetromino.point.x += 1;
        }
    }

    moveRight(){
        if(this.islose){
            return;
        }
        this.currentTetromino.point.x += 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
        } else {
            this.currentTetromino.point.x -= 1;
        } 
        this.currentTetromino.updatePos(this.currentTetromino.matrix);
    }
    moveDow(){
        if(this.islose){
            return;
        }
        this.currentTetromino.point.y += 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
            this.currentTetromino.updatePos(this.currentTetromino.matrix);
        } else{
            this.updateTetrominoOnBoard(this.currentTetromino, point.x, point.y-1);
            this.currentTetromino.point.y -= 1;

        }
    }

    dropDown(){
        if(this.islose){
            return;
        }
        this.currentTetromino.point.y += 1;
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
            this.currentTetromino.updatePos(this.currentTetromino.matrix);
        }else{
            this.updateTetrominoOnBoard(this.currentTetromino, point.x, point.y - 1);
            this.currentTetromino.point.y -= 1;
            let currentColor = this.currentTetromino.color;
            this.currentTetromino = null;
            this.clearFullRows(this.arrBoard, currentColor);
            this.emit(BoardEvent.LOSE, this.arrBoard);
        }
        
    }

    rotateMatrix(matrix) {
        const numRows = matrix.length;
        const numCols = matrix[0].length;
        const newMaxtrix = [];
        for(let i = 0; i < numCols; i++) {
            let newRows = [];
          for(let j = numRows - 1; j >= 0; j--) {
            newRows.push(matrix[j][i]);
          }
          newMaxtrix.push(newRows);
        }
        return newMaxtrix;
    } 

    rotation(){
        if(this.isloss){
            return;
        }
        this.newArr = this.rotateMatrix(this.newArr);
        let point = this.currentTetromino.point;
        if(this.isValidMove(this.newArr, point.x, point.y)){
            this.currentTetromino.updatePos(this.newArr, this.currentTetromino.point.x, this.currentTetromino.point.y);
        }
    }

    findnextPosition(matrix, x, y){
        let numRow = this.arrBoard.length;
        for(let i = numRow -1; i >= 0; i--){
           if( this.isValidMove(matrix, x, i)){
                return i;
            }
        }
    }

    lockToBotTom(){
        let point = this.currentTetromino.point;
        let nextRow = this.findnextPosition(this.currentTetromino.matrix, point.x, point.y);
        let rs = this.isValidDirectionMove(this.currentTetromino.matrix, point.x, nextRow);
        if(rs.isValid){
            this.lockTetromino(this.currentTetromino, point.x, nextRow);
        } else {
            this.lockTetromino(this.currentTetromino, point.x, rs.row);
        }
    }
    
    lockTetromino(tetrimino, x, y){
        tetrimino.point.y = y;
        tetrimino.updatePos(tetrimino.matrix);
    }

    isValidDirectionMove(matrix, x, nextRow){
        let rs = {isValid: true, row: nextRow}
        for(let i = 0; i < nextRow; i++){
            if(!this.isValidMove(matrix, x, i)){
                rs.isValid = false;
                rs.row = i - Math.floor(matrix.length / 2);
                return rs;
            }
        }
        return rs;
    }

    isFullRow(row,board){
        for(let col = 0; col < board[row].length; col++){
            if(board[row][col] === 0){
                return false;
            }
        }
        return true;
    };

    clearFullRows(board, currentColor){
        const numRows = board.length;
        let clearedRows = 0;
        let rows = [];
        for (let row = numRows - 1; row >= 0; row--) {
          if (this.isFullRow(row, board)) {
            rows.push(row);
            clearedRows++;
          }
        }
        if(rows.length > 0){
            this.removeBoardDataByRows(rows);
            this.removePiceByRows(rows, currentColor);
            const tween = new Tween(clearedRows)
            .to({alpha : 0 },GameConstant.TWEEN_DURATION)
            .onComplete(()=>{
                this.dropPices(rows,clearedRows);
                this.spawnNewTetromino();
            })
            .start(Game.currentTime);
            this.emit(BoardEvent.ROWCLEARED, clearedRows);
        }
        else{
            this.spawnNewTetromino();
        }
    }

    dropPices(rows, rowCount){
        let rowStart = rows[0];
        this.pices.forEach(pice => {
            if(pice.row < rowStart){
                pice.row += rowCount;
                pice.y = pice.row * GameConstant.TETROMIO_SPACE;
            }
        });
    }

    removeBoardDataByRows(rows){
        let numRow = this.arrBoard.length;
        for (let i = numRow - 1; i >= 0; i--) {
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                if(row === i){
                    this.arrBoard.splice(i, 1);
                }
            } 
        }
        for (let index = 0; index < rows.length; index++) {
            this.arrBoard.unshift(Array(this.arrBoard[0].length).fill(0));
        }
    }

    removePiceByRows(rows, currentColor){
        let row = this.pices.length;
        this.pices.sort((a, b) => a.x - b.x);
        let texture = Texture.from(currentColor);
        for (let i = 0; i < row; i++) {
            const pice = this.pices[i];
            rows.forEach(r => {
                if(pice.row === r){
                    pice.anchor.set(0.5);
                    pice.x += pice.width/2;
                    pice.y += pice.height/2;
                    pice.texture = texture;
                    const scaleTween = new Tween(pice.scale)
                    .to({x: 0 ,y: 0}, GameConstant.TWEEN_DURATION)
                    .delay(i * 0.5)
                    .start(Game.currentTime);
                    const rotationTween = new Tween(pice)
                    .to({rotation: Math.PI * 4},GameConstant.TWEEN_DURATION)
                    .delay(i * 0.5)
                    .start(Game.currentTime)
                }
            });
        }
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite);   
    }
   
    registerEvent() {
        document.addEventListener("keydown", (e) => {
            if(!this.currentTetromino){
                return;
            }
            if(e.code === "KeyA") {
                this.moveLeft();
            }
            else if(e.code ==="KeyD"){
                this.moveRight();
            }
            else if (e.code ==="KeyW"){
                this.rotation();
            }
            else if(e.code === "KeyS"){
                this.moveDow();
            }
            else if(e.code === "Space"){
                this.lockToBotTom(); 
            }
        })
    }

    isValidMove(tetrimino, x, y) {
        const startCol = x - Math.floor(tetrimino[0].length / 2);
        const startRow = y - Math.floor(tetrimino.length / 2) < 0 ? 0 : y - Math.floor(tetrimino.length / 2);
        // Check if the Tetrimino is within the grid boundaries and doesn't collide with other blocks
        for (let row = tetrimino.length -1 ; row >= 0; row--) {
            for (let col = 0; col < tetrimino[row].length; col++) {
                if (tetrimino[row][col] === 1) {
                    const gridY = startRow + row;
                    const gridX = startCol + col;
                    if (gridX < 0 || gridX >= this.arrBoard[0].length || gridY >= this.arrBoard.length) {
                        return false;
                    }
                    if(this.arrBoard[gridY][gridX] === 1){
                        return false;
                    }
                }
            }
        }

        return true;
    }

    update(dt){
        if(!this.currentTetromino || this.isPaused){
            return;
        }
        this.dt += 1;
      if(this.dt % 30 === 0) {
        this.dropDown();
      }
    }

    updateTetrominoOnBoard(tetromino, x, y){
        let rows = tetromino.matrix.length;
        let cols = tetromino.matrix[0].length;
        const startCol = x - Math.floor(tetromino.matrix[0].length / 2);
        const startRow = y - Math.floor(tetromino.matrix.length / 2) < 0 ? 0 : y - Math.floor(tetromino.matrix.length / 2);
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                const boardRow = startRow + i;
                const boardCol = startCol + j;
                if(tetromino.matrix[i][j] === 1){
                    this.arrBoard[boardRow][boardCol] = tetromino.matrix[i][j];
                }
            }
        }
    }

    pause(){
        this.isPaused = true;
    }

    resume(){
        this.isPaused = false;
    }

}