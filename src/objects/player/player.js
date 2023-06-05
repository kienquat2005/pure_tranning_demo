import { Container, Graphics, Sprite, Texture } from "pixi.js";

export class Player extends Container{
  constructor(){
    super();
    this.totalHealth = 100;
    this.speed = 15;
    this.createSpire();
    this.direction();

  }
  createSpire(){
    this.spire = new Sprite(Texture.from("../../../assets/images/explorer.png"));
    this.addChild(this.spire);
  }

  direction(){
    document.addEventListener("keydown", (e) => {
      if(e.key === "a"){
        this.x -= this.speed;
      }
      else if(e.key === "d"){
        this.x += this.speed;
      }
      else if(e.key === "w"){
        this.y -= this.speed;
      }
      else if(e.key === "s"){
        this.y += this.speed;
      }
    })
  }

}