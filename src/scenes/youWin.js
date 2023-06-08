import { Container, Graphics, Text } from "pixi.js";

export class Youwin extends Container{
    constructor(){
        super();
        this.createBackgroud();
        this.createYouWin();
    }
    createBackgroud(){
        this.backgroud = new Graphics();
        this.backgroud.beginFill(0x000000);
        this.backgroud.drawRect(0, 0, 512, 512);
        this.addChild(this.backgroud);
    }
    createYouWin(){
        this.youwin = new Text("You won", {fill : 0xffffff});
        this.youwin.x = 512/2;
        this.youwin.y = 512/2;
        this.addChild(this.youwin);
    }
}

































// import { Application, Container, Graphics, Text } from "pixi.js";

// export class YouWin extends Container{
//     constructor(){
//         super();
//         this.createBackground();
//         this.createYouWin();
//     }

//     createBackground(){
//         this.bg = new Graphics();
//         this.bg.beginFill(0x000000);
//         this.bg.drawRect(0, 0, 512, 512);
//         this.addChild(this.bg)
//     }

//     createYouWin(){
//         this.texty = new Text(" You Won ",{
//             fill : 0xffffff
//         });
//         this.addChild(this.texty);
//         this.texty.x = 512 / 2;
//         this.texty.y = 512/ 2;
//     }
// }