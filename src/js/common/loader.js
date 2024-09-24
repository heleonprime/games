import { Sprite } from '../components/sprite.js'
import { Texture } from "../components/texture.js";
import l from './log.js';

export class Loader {
    constructor(o, app){
        this.options = {
            text: 'Loading...',
            width: 50,
            height: 50,
            bgColor: '#ffffff',
            preloaderImage:'/src/images/preloader-sm.webp',
            textColor: '#0a0a0a',
            nextScreen: null,
            timeout: 3000,
            fontStyle: "12px PressStart2P",
        };
        this.layer = app.layer;
        this.app = app;
        
        this.setOptions(o);
        
        
        this.startLoading();

        return this;
    }
    setOptions(o) {
        if(typeof o === "object")
        {
            this.options = Object.assign(this.options, o);
        }
        return this;
    }
    update(){
        if(this.textures && this.texturesCount === 0 && this.timeoutFired)
        {
            if (this.options.nextScreen)
            {
                this.timeoutFired = null;
                this.options.textures = null;
                this.isLoading = false;
                this.nextScreen = null;
                this.app.currentScreen = this.options.nextScreen;
            }
        }
        else{
        }
        this.layer.context.fillStyle = this.options.bgColor;
        this.preloader.update();
        return this;
    }
    display(){
        this.layer.context.fillRect(0, 0, this.layer.width, this.layer.height);
        this.layer.drawSprite({
            x: ((this.layer.width/2) - (this.options.width/2)), 
            y: ((this.layer.height/2) - (this.options.height/2)) - (this.options.height/2),
        }, this.preloader);

        this.drawText();
        return this;
    }

    drawText() {
        this.layer.context.fillStyle = this.options.textColor;
        this.layer.context.font = this.options.fontStyle;
        this.layer.context.textAlign = "center";
        this.layer.context.fillText(this.options.text, (this.layer.width/2), (this.layer.height/2) + (this.options.height/2));
        return this;
    }

    startLoading() {
        this.textures = this.options.nextScreen.options.textures;
        this.layer.bgColor = this.options.bgColor;
        this.preloader = null;
        this.timeoutFired = false;
        this.isLoading = true;
        if(Object.keys(this.textures))
        {
            this.texturesCount = Object.keys(this.textures).length;
        }
        this.setStopTimeout();
        this.preloader = new Sprite({
            texture: new Texture({ 
                imageUrl: this.options.preloaderImage, 
            }, this.app),
            animated: true,
            looped: true,
            framesCount: 296,
            width: 50,
            height: 50
        }, this.app);       
        return this;
    }
    setStopTimeout()
    {
        if(this.options.timeout)
        {
            this.timeoutFired = false;
            setTimeout(()=> {
                this.timeoutFired = true;
                l('fired');
            }, this.options.timeout)
        }
        else
        {
            this.timeoutFired = true;
        }
        return this;
    }


}