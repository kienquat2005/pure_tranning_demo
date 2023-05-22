// import { Application, Sprite, Texture } from "pixi.js";

import { Application, Container, Graphics, Sprite, TextStyle, Text, BitmapText, AnimatedSprite, Texture } from "pixi.js";

export class Game {
    constructor(){
        this.app = new Application();
        document.body.appendChild(this.app.view);
        var clampy = Sprite.from("../assets/images/cat.png");
        clampy.anchor.set(0.5);
        clampy.x = this.app.screen.width / 2;
        clampy.y = this.app.screen.height / 2;
        // clampy.width = 80;
        // clampy.height = 120;
        this.app.stage.addChild(clampy);
        // clampy.rotation = 1;
        // this.app.ticker.add((dt)=> {
        //     clampy.angle += dt *10;
        // })

        this.createGraphic();
        this.createContainer();
        this.createText();
        this.createAnimation();
        this.createCollision();
    }

    createContainer(){
        var contry = new Container();
        contry.x = 500;
        contry.y = 0;
        this.app.stage.addChild(contry);

        this.clampy = Sprite.from("../assets/images/mouse.png");
        this.clampy.x = 100;
        this.clampy.y = 100;
        contry.addChild(this.clampy);
        this.clampy.interactive = true;

        this.clampy.on("pointertap",() => this.onClicky());

        document.addEventListener("keydown", (e) => {
            if(e.code === "KeyD"){
                this.clampy.x += 5;
            }
            else if(e.code === "KeyW"){
                this.clampy.y -= 5;
            }
            else if(e.code === "KeyA"){
                this.clampy.x -=5;
            }
            else if(e.code === "KeyS"){
                this.clampy.y +=5;
            }
        })
    }
    onClicky(e) {
        this.clampy.scale.set(2)
    }


    createGraphic(){
        var graphy = new Graphics();
        graphy.beginFill(0xFF00FF);
        graphy.lineStyle(10, 0x00FF00);
        graphy.drawCircle(0, 0, 25);

        graphy.endFill();
        this.app.stage.addChild(graphy);

        graphy.x = 100;
        graphy.y = 100;

    }

    createText(){  
        var style = new TextStyle({
            align: "center",
            fill: "#754c24",
            fontSize: 42 
        });
        const texty = new Text('Hello world！', style);
        texty.text = "This is expensive to change, please do not abuse";

        this.app.stage.addChild(texty);
    }
    
    createBimapText(){
        BitmapFont.from("comic 32", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 32
        })
        var bitmapTexty = new BitmapText("I love baking, my family, and my friends",{
            fontName: "comic 32",
            fontSize: 32,
            tint: 0xFF0000
        });
        bitmapTexty.text = "This is cheap";
        bitmapTexty.text = "Change it as much as you want";

        this.app.stage.addChild(bitmapTexty);    
        
    }

    // createAnimation(){
    //     var clampyFrames = [
    //         "../assets/images/cat.png",
    //         "../assets/images/mouse.png"

    //       ];
    //       var animatedClampy = new AnimatedSprite(clampyFrames.map((stringy) => Texture.from(stringy)));
       
    //       this.app.stage.addChild(animatedClampy);
    //       animatedClampy.play()
    // }
    // createCollision(){
    //     var rightmostLeft = a.left < b.left ? b.left : a.left;
    //     var leftmostRight = a.right > b.right ? b.right : a.right;

    //     if (leftmostRight <= rightmostLeft)
    //     {
    //         return false;s
    //     }

    //     var bottommostTop = a.top < b.top ? b.top : a.top;
    //     var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    //     return topmostBottom > bottommostTop;
    // }

}
var game = new Game();

