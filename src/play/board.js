import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../gameConstant";
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
        this.position.set(100);
        this.pointX = 0;
        this.pointy = 0;
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
        this._initBoard();
        this.__initFirstTetromino();
        this.registerEvent();
    }
    _initBoard(){
     for(let i = 0; i < this.arrBoard.length; i++ ){
        for(let j = 0 ; j < this.arrBoard[i].length; j++ ){
            if(this.arrBoard[i][j] === 0){
                this.square = new Graphics()
                this.square.beginFill(0x000000);
                this.square.lineStyle(2, 0xffffff);
                this.square.drawRect(0 , 0 ,50, 50);
                this.square.endFill();
                this.addChild(this.square);
                this.square.x = j * GameConstant.SQUARE_SPACE;
                this.square.y = i * GameConstant.SQUARE_SPACE;
            }
        }
     }
    }
    __initFirstTetromino(){
        let tetromino = new Tetromino(5, 0 ,this.matrix.tetriminoJ.shape, this.matrix.tetriminoJ.color, this);
        this.currentTetromino = tetromino;
        this.newArr = tetromino.matrix;
    }
    moveLeft(){
        this.currentTetromino.point.x -= 1;
        let point = this.currentTetromino.point;
        this.currentTetromino.updatePos(this.currentTetromino.matrix);
        // if(this.isValidMove(this.currentTetromino.matrix, point.x, point.y)){
        //     this.currentTetromino.updatePos(this.currentTetromino.matrix)
        // }
        // else{
        //     this.currentTetromino.point.x +=1;
        // }
    }
    moveRight(){
        
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

    registerEvent(){
        document.addEventListener("keydown",(e)=>{
            if(e.code === "KeyA"){
                this.moveLeft();
            }
        })
    }
}
    