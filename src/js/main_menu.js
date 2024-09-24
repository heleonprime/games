import { Sprite } from "./components/sprite.js";
import { Texture } from "./components/texture.js";
import { Button } from "./components/interface/button.js";

export class MainMenu {               //game/animation loop
    constructor(o, app) {
      this.app = app;
      this.btnUrl = '/src/images/button_game.png'; // '/src/images/main_manu_buttons_bg_diff.webp';
      this.btnDecoreUrl = '/src/images/button_game_decore.png'; // '/src/images/main_manu_buttons_bg_diff.webp';
      this.bgUrl =  '/src/images/main_menu_bg.png'; //'/src/images/main_menu_bg.webp';
      this.options = {
        textures: {}
      };
      this.options.textures[this.btnUrl] = new Texture({imageUrl: this.btnUrl}, this.app),
      this.options.textures[this.btnDecoreUrl]  = new Texture({imageUrl: this.btnDecoreUrl}, this.app),
      this.options.textures[this.bgUrl] = new Texture({imageUrl: this.bgUrl}, this.app),
      this.setOptions(o);
      this.bg = null;
      this.controls = {
        playBtn: null, 
        settingsBtn: null, 
        exitBtn: null,
      };
    }
    setOptions(o) {
      if(typeof o === "object")
      {
          this.options = Object.assign(this.options, o);
      }
      return this;
    }
    initControls() {
      if(!this.controls.playBtn)
      {
        this.controls.playBtn = new Button({
          sprites: {
            normal: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173,  }),
            hover: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 173, }),
            click: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 346, })
          },
          text: 'Start!',
          x: this.app.layer.width / 2 - this.options.textures[this.btnUrl].width / 2,
          y: 150,
          onClick: function() {
            l('playBtn clicked');
          },
        }, this.app);
      }
      if(!this.controls.settingsBtn)
      {
        this.controls.settingsBtn = new Button({
          sprites: {
            normal: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, }),
            hover: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 173, }),
            click: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 346, })
          },
          text: 'Settings',
          x: this.app.layer.width / 2 - this.options.textures[this.btnUrl].width / 2,
          y: 370,
          onClick: function() {
            l('settingsBtn clicked');
          },
        }, this.app);
      }
      if(!this.controls.exitBtn)
      {
        this.controls.exitBtn = new Button({
          sprites: {
            normal: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173,  }, this.app),
            hover: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 173, }, this.app),
            click: new Sprite({ texture: this.options.textures[this.btnUrl], frameWidth: 400, frameHeight: 173, startY: 346, }, this.app)
          },
          text: 'Exit',
          x: this.app.layer.width / 2 - this.options.textures[this.btnUrl].width / 2,
          y: 590,
          onClick: () => {
            l('exitBtn clicked');
            this.removeControlsEvents();
            this.app.currentScreen = null;
            this.app.clearLayer();
          },
        }, this.app);
      }
    }
    update() {
      if(!this.bg)
      {
        this.bg = new Sprite({
          frameWidth: 1920,
          frameHeight: 1080,
          texture: this.options.textures[this.bgUrl],
          resize: true,
        });
      }
      if(!this.decore)
      {
        this.decore = new Sprite({
          frameWidth: 400,
          frameHeight: 173,
          texture: this.options.textures[this.btnDecoreUrl],
        });
      }
      this.initControls();
      this.updateControls();
    }
    display() {
      if(this.bg){
        this.app.layer.drawSprite({
          x: 0,
          y: 0,
        }, this.bg);
      }
      this.displayControls();
      if(this.decore){
        this.app.layer.drawSprite({
          x: this.app.layer.width / 2 - this.options.textures[this.btnUrl].width / 2,
          y: 150,
        }, this.decore);
      }
    }
    removeControlsEvents() {
      console.log(this.controls);
      Object.keys(this.controls).forEach((control) => {
        this.controls[control].removeEventListeners();
      });
    }
    displayControls() {
      Object.keys(this.controls).forEach((control) => {
        if(this.controls[control])
          this.controls[control].display();
      });
    }

    updateControls() {
      Object.keys(this.controls).forEach((control) => {
        this.controls[control].display();
      });
    }
  }