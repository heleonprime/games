import { Texture } from "./texture.js";

export class Sprite {
    constructor(o, app){
        let _self = this;
        this.app = app;
        this.options = {
            // text: 'SomeButton',
            frameWidth: 50,
            frameHeight: 50,
            startX: 0,
            startY: 0,
            bgColor: '#transparent',
            textColor: 'white',
            animated: false,
            looped: false,
            framesCount : 1,
            resize: false,
            // direction: ['lr', 'tb'], // lr, rl, tb, bt
            // textureUrl: null, //'../src/images/preloader-sm.webp',
        };
        this.setOptions(o)
        this.visible = true;
        this.loaded = false;
        this.animating = this.options.animated;

        this.texture = this.options.texture;

        this.reset();

    }
    setOptions(o) {
        if(typeof o === "object")
        {
            this.options = Object.assign(this.options, o);
        }
        return this;
    }
    update() 
    {
        if(this.texture.loaded) {
            if(this.options.animated)
            {
                if(this.currentFrame.num === 0)
                {
                    this.animating = true;
                    this.currentFrame.num++;
                }
                else
                {
                    this.calculateFrame();
                }
            }
            else
            {
                if(this.currentFrame.num === 0)
                {
                    this.currentFrame.num++;
                }
            }
        }
        else
        {
        }
    }
    calculateFrame() 
    {
        if(this.texture.loaded && this.options.animated && this.animating)
        {
            if(this.currentFrame.num >= this.options.framesCount)
            {
                if(this.options.looped)
                {
                    this.reset();
                    this.nextFrame();
                }
                else
                {
                    this.animating = false;
                }
            }
            else
            {
                this.nextFrame();
            }
        }
    }

    nextFrame()
    {
        this.currentFrame.num++;
        if(this.currentFrame.num === 1) {return this}
        if( ( this.currentFrame.x + this.currentFrame.width) >= this.texture.width)
        {
            if( ( this.currentFrame.y + this.currentFrame.height) >= this.texture.height )
            {
                this.reset();
            }
            else
            {
                this.currentFrame.x = this.options.startX;
                this.currentFrame.y = this.currentFrame.y + this.currentFrame.height;
            }
        }
        else
        {
            this.currentFrame.x = this.currentFrame.x + this.currentFrame.width;

        }
        return this;
    }

    reset()
    {
        this.currentFrame = {
            x: this.options.startX,
            y: this.options.startY,
            width: this.options.frameWidth,
            height: this.options.frameHeight,
            num: 0,
        };
    }
}