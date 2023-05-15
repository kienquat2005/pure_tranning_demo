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
        this.app.stage.addChild(clampy);
        this.app.ticker.add((dt)=> {
            clampy.angle += dt *10;
        })

        this.createGraphic();
        this.createContainer();
        this.createText();
        this.createAnimation();
    }

    createContainer(){
        var contry = new Container();
        contry.x = 500;
        contry.y = 0;
        this.app.stage.addChild(contry);

        var clampy = Sprite.from("../assets/images/mouse.png");
        clampy.x = 100;
        clampy.y = 100;
        contry.addChild(clampy);
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

    createAnimation(){
        var clampyFrames = [
            "../assets/images/cat.png",
            "../assets/images/mouse.png"

          ];
          var animatedClampy = new AnimatedSprite(clampyFrames.map((stringy) => Texture.from(stringy)));
       
          this.app.stage.addChild(animatedClampy);
          animatedClampy.play()
        }
  


}
var game = new Game();


// Game.init();
// container

// import { Application, BitmapFont, BitmapText, ParticleContainer, Sprite, TextStyle } from 'pixi.js'
// import { container } from 'webpack';

// const app = new Application({
//     resolution: window.devicePixelRatio || 1,
//     backgroundColor: 0x6495ed,
//     width: 720,
//     height: 1280
// });
// 

// sprie

// var clampy = Sprite.from("../assets/images/cat.png");
// clampy.anchor.set(0.5);
// clampy.x= app.screen.width / 2;
// clampy.y= app.screen.height / 2;
// app.stage.addChild(clampy)


// Graphics
// var graphy = new Graphics();
// graphy.beginFill(0xFF00FF);
// graphy.lineStyle(10, 0x00FF00);
// graphy.drawCircle(0, 0, 25);

// graphy.endFill();
// app.stage.addChild(graphy);

// graphy.x = 100;
// graphy.y = 100;

// Text
// var style = new TextStyle({
//     align: "center",
//     fill: "#754c24",
//     fontSize: 42
// });
// const texty: Text = new Text("Hello World", style);
// texty.text = "This is expensive to change, please do not abuse";

// app.stage.addChild(texty);

//BitmapText

// BitmapFont.from("comic 32", {
//     fill: "#ffffff",
//     fontFamily: "Comic Sans MS",
//     fontSize: 32
// })
// var bitmapTexty = new BitmapText(" I love baking, my family, and my friends",{
//     fontName: "comic 32",
//     fontSize: 32,
//     tint: 0xFF0000
// })
// bitmapTexty.text = "This is cheap";
// bitmapTexty.text = "Change is as much as you want";
// app.stage.addChild(bitmapTexty);

// Filter
// import { BlurFilter } from 'pixi.js';
// var myBlurfilter = new BlurFilter();
// clampy.filters = [myBlurfilter];

// Particles

// import * as particleSettings from "../emitter.json";
// var prticleContainer = new ParticleContainer();
// app.stage.addChild(particleSettings);


// window.onload = function () {
//     Game.init();
// }
