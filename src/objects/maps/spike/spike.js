import { Container, Sprite, Texture } from "pixi.js";
import { Collider } from "../../../physics/aabb/collider";
import { CollisionTag } from "../../../physics/aabb/collisionTag";

export class Spike extends Container{
    constructor(){
        super();
        this.spikes = [];
        this.spike = new Sprite(Texture.from("/assets/images/spike-16-27-56.png"))
        this.addChild(this.spike);

        // this.collider = new Collider(CollisionTag.Spike);
        // this.collider.width = 48;
        // this.collider.height = 48;
        // this.addChild(this.collider);
    }
    onCollider(){
        this.collider.enabled = false;
    }
}