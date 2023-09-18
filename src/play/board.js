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
        this.dt = 0;
        this.matrix = 
        this.matrix = {
            tetrominoT:{
                shape:[
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ],
                color:"/assets/images/tileBlu.png",
            },
            tetrominoL:{
                shape:[
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1]
                ],
                color: "/assets/images/tileBlu.png",
            },
            tetrominoO:{
                shape:[
                    [1, 1],
                    [1, 1]
                ],
                color:"/assets/images/tileGreen.png",
            },
            tetrominoJ:{
                shape:[
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                color:"/assets/images/tileGrey.png",
            },
            tetrominoZ:{
                shape:
                    [
                        [1, 1, 0],
                        [0, 1, 1],
                        [0, 0, 0]
                    ],
                color: "/assets/images/tilerred.png",
            },
            tetrominoL:{
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
        this.newArr = this.matrix;
        this._initBoard();
        this._initFirstTetromino();
        this.registerEvent();
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite )
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
        let tetrimino = new Tetromino(5, 0 , matrix.shape, matrix.color ,this);
        this.currentTetromino = tetrimino;
        this.newArr = tetrimino.matrix;
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite )
    }
    
    getRamdomIndex(array){
        const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
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

    dropDown(){
       this.currentTetromino.point.y += 1;
       let point = this.currentTetromino.point;
       if(this.isValidMove(this.currentTetromino.matrix, point.x,point.y)){
        this.currentTetromino.updatePos(this.currentTetromino.matrix);
       }
       else{
        this.updateTetrominoOnBoard(this.currentTetromino, point.x, point.y - 1);
        this.currentTetromino.point.y -= 1;
        this.currentTetromino = null;
        this.spawnNewTetromino();
        this.clearFullRows(this.arrBoard);
       }
    }
    isFullRow(row,board){
        for(let col = 0; col < board[row].length; col++){
            if(board[row][col] === 0){
                return false;
            }
        }
        return true;
    };

    clearFullRows(board){
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
            this.removePiceByRows(rows);
            this.removeBoardDataByRows(rows);
            this.dropPices(rows, clearedRows);
        }
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

    removePiceByRows(rows){
        let row = this.pices.length;
        for (let i = 0; i < row; i++) {
            const pice = this.pices[i];
            rows.forEach(r => {
                if(pice.row === r){
                    this.removeChild(pice);
                    pice.destroy();
                }
            });
        }
        this.pices = this.children.filter(pice => pice.row !== undefined && pice.col !== undefined && pice instanceof Sprite);   
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
            this.lockTetromino(this.currentTetromino,point.x, rs.row);
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
            else if(e.code ==="KeyW"){
                this.rotation();
            }
            else if(e.code ==="KeyS"){
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
                    // console.log(gridY, this.arrBoard.length);
                    if (gridX < 0 || gridX >= this.arrBoard[0].length || gridY >= this.arrBoard.length) {
                        // console.log(gridY);
                        return false;
                    }
                    if(this.arrBoard[gridY][gridX] === 1){
                        // console.log(gridY);
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


    update(dt){
        this.dt += 4;
        if(this.dt % 50 === 0){
            this.dropDown();
        }

    }
}