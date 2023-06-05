import { Sound } from "@pixi/sound";
import { Howl } from "howler";
import { Container, Graphics } from "pixi.js";
import { CollisionDetector } from "../collisionDetector/collisionDetector";
import { BackGround } from "../objects/background/background";
import { Door } from "../objects/door/door";
import { Enemy } from "../objects/enemies/enemy";
import { EnemyManager } from "../objects/enemies/enemyManager";
import { Player } from "../objects/player/player";
import { Treasure } from "../objects/treasure/treasure";
import { YouLose } from "./youLost";
import { YouWin } from "./youWin";

export class PlayScene extends Container {
  constructor(){
    super();
    this.createBackGround();
    this.createTreasure();
    this.createDoor();
    this.createPlayer();
    this.createHealth();
    this.initEnemyManager();
    this.createYouwin();
    this.createYoulose();
    this.testSound();
  }

  createBackGround(){
    this.background = new BackGround();
    this.addChild(this.background);
  }

  createTreasure(){
    this.treasure = new Treasure();
    this.addChild(this.treasure);
    this.treasure.x = 512-65;
    this.treasure.y = 512/2;
  }

  createDoor(){
    this.door = new Door();
    this.addChild(this.door);
  }
  createPlayer(){
    this.player = new Player()
    this.addChild(this.player);
    this.player.x = 50;
    this.player.y = 512/2;
  }

  createHealth(){
    this.health = new Graphics()
    this.health.beginFill(0xd10000);
    this.health.drawRect(0, 0, 180, 10);
    this.health.x = 300;
    this.health.y = 20;
    this.addChild(this.health);
  }

  initEnemyManager(){
    this.enemyManager = new EnemyManager();
    this.addChild(this.enemyManager);
    this.enemies = this.enemyManager.enemies;
  }

  createYouwin(){
    this.youwin = new YouWin();
  }

  createYoulose(){
    this.youlose = new YouLose();
  }

  update(dt){
    this.enemyManager.update();
    if(CollisionDetector.detectCollision(this.player,this.treasure)){
      this.onPlayerCollideWithTreasure();
    }

    if(CollisionDetector.detectCollision(this.treasure,this.door)){
      this.addChild(this.youwin)
    }

    // for(let i = 0; i < this.enemies.length; i ++){
    //   if(CollisionDetector.detectCollision(this.player, this.enemies[i])){
    //     console.log("cham")
    //   }
    // }

    this.enemies.forEach((enemy) => {
      if(CollisionDetector.detectCollision(this.player, enemy)){
        this.onPlayerColliderWithEnemy();
      }
    })
  }

  onPlayerCollideWithTreasure(){
    this.treasure.x = this.player.x + 3;
    this.treasure.y = this.player.y + 3;
  }

  onPlayerColliderWithEnemy(){
    this.health.width -= 2;
    if(this.health.width <= 0){
      this.addChild(this.youlose);
    }
  }

  testSound(){
    let sound = new Howl({
      src: ['../../assets/sound/futuristic-logo-3-versions-149429.mp3'],
      autoplay: true,
      loop: false,
      volume: 0.8,

    });
    
    sound.play();
    
  }
}