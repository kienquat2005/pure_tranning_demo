import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Enemy } from "./enemy";

export class EnemyManager extends Container{
  constructor(){
    super();
    this.enemies = [];
    this.initEnemies();
  }

  // initEnemies(){
  //   for(let i = 0; i < 6; i++){
  //     let enemy = new Enemy();
  //     this.addChild(enemy);
  //     this.enemies.push(enemy);
  //   }

  //   for(let i = 0; i < this.enemies.length; i++){
  //     let x = this.getRandom();
  //     let y = this.getRandom();
  //     this.enemies[i].x = x;
  //     this.enemies[i].y = y
  //   }
  // }
  initEnemies(){
    for(let i= 0 ; i<6 ; i++){
      let enemy = new Enemy();
      this.addChild(enemy);
      this.enemies.push(enemy);
    }

    for(let i = 0; i < this.enemies.length; i++){
      let x = this.getRandom();
      let y = this.getRandom();
      this.enemies[i].x = x;
      this.enemies[i].y = y;
    }
  }

  getRandom(){
    let randomNumber = Math.floor(Math.random() * 350) + 100;
    return randomNumber;
  }

  move(){
    for(let i = 0; i < this.enemies.length; i++){
      this.enemies[i].y += this.enemies[i].velocity;
      if(this.enemies[i].y >= GameConstant.GAME_HEIGHT || this.enemies[i].y <= 0 ){
        this.enemies[i].velocity *= -1;
      }
      
    }
  }

  update(){
    this.move();
  }

}