import { Howl } from "howler";
import { Container, Graphics } from "pixi.js";
import { CollisionDetector } from "../collisionDetector/collisionDetector";
import { Background } from "../objects/background/background";
import { Door } from "../objects/door/door";
import { EnemyManager } from "../objects/enemies/enemyManager";
import { Player } from "../objects/player/player";
import { Treasure } from "../objects/treasure/treasure";
import { YouLose } from "./youLost";
import { Youwin } from "./youWin";

export class PlayScene extends Container {
  constructor(){
    super();
    this.createBackgroud();
    this.createDoor();
    this.createTreasure();
    this.createPlayer();
    this.createEnemyManager();
    this.createYouWin();
    this.createHealth();
    this.createYoulost();
    this.testSound();
    
  }

  createBackgroud(){
    this.backgroud = new Background();
    this.addChild(this.backgroud);

  }

  createDoor(){
    this.door = new Door();
    this.addChild(this.door); 
  }

  createTreasure(){
    this.treasue = new Treasure();
    this.addChild(this.treasue);
    this.treasue.x = 512 - 60;
    this.treasue.y = 512 / 2;
  }

  createPlayer(){
    this.player = new Player();
    this.addChild(this.player);
    this.player.x = 100;
    this.player.y = 512 / 2;
  }

  createEnemyManager(){
    this.enemymanager = new EnemyManager()
    this.addChild(this.enemymanager);
    this.enemis = this.enemymanager.enemies;
  }

  createYouWin(){
    this.youwin = new Youwin();
    // this.addChild(this.youwin);
  }
  
  createYoulost(){
    this.youlost = new YouLose();
  }

  createHealth(){
    this.health = new Graphics();
    this.health.beginFill(0xd10000);
    this.health.drawRect(0, 0, 180, 10);
    this.health.x = 300;
    this.health.y = 8;
    this.addChild(this.health);
  }

  update(){
    this.enemymanager.update();
    if(CollisionDetector.detectCollision(this.player,this.treasue)){
      this.onPlayerCollideWithTreasure();
    }
    if(CollisionDetector.detectCollision(this.treasue,this.door)){
      this.onTreasureCollideWithDoor();
    }
    
    this.enemis.forEach((enemy) => {
      if(CollisionDetector.detectCollision(this.player,enemy)){
        this.onPlayerCollideWithEnemy();
      }   
    });
    
    
  }

  onPlayerCollideWithTreasure(){
    this.treasue.x = this.player.x;
    this.treasue.y = this.player.y
  }

  onTreasureCollideWithDoor(){
    this.addChild(this.youwin);
  }

  onPlayerCollideWithEnemy(){
    this.health.width -= 2 ; 
    if(this.health.width <= 0){
      this.addChild(this.youlost)
    } 
  }
  testSound(){
    let sound = new Howl({
      src: ['../../assets/sound/futuristic-logo-3-versions-149429.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.8,

    });
    
    sound.play();
    
  }
}