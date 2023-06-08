import { Container, Sprite, Texture } from "pixi.js";

export class Player extends Container{
  constructor(){
    super();
    this.createSpirePlayer();
    this.speed = 10;
    this.direction();
  }

  createSpirePlayer(){
    this.spirePlayer = new Sprite(Texture.from("/assets/images/explorer.png"));
    this.addChild(this.spirePlayer);
  }

  direction(){
    document.addEventListener("keydown" , (e) =>{
      if (e.key === "a"){
        this.x -= this.speed;
      }
      else if(e.key === "d"){
        this.x += this.speed;
      }
      else if(e.key === "s"){
        this.y += this.speed;
      }
      else if(e.key === "w"){
        this.y -= this.speed;
      }
    })
  }
}






































