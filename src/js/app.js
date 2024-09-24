import { Layer } from './common/layer.js'
import { Loop } from './common/loop.js'
import { Loader } from './common/loader.js'
import { MainMenu } from './main_menu.js'
import { Texture } from './components/texture.js'

import l from './common/log.js'; window.l = l;

class App {
  constructor(container) {
    this.layer = new Layer(container);
    l('layer:', this.layer);
    
    this.options = {
      showFPS: 1,
      defaultFont: {
        style: "16px PressStart2P",
        color: 'white',
      }
    }

    this.fps = 0;
    this.fpsToShow = 0;
    this.lastTime = performance.now();

    new Loop(this.update.bind(this), this.display.bind(this));

    this.loader = new Loader({
      nextScreen: new MainMenu({}, this)
    }, this);
    this.currentScreen = this.loader;
    l('currentScreen', this.currentScreen)

    setInterval(() => {
      this.fpsToShow = this.fps;
    }, 200)
  }
  update(correction) {
    if(this.currentScreen)
      this.currentScreen.update();

    if(this.options.showFPS) this.calculateFPS();
  }
  display() {
    this.clearLayer()

    if(this.currentScreen)
    {
      this.currentScreen.display();
      if(this.options.showFPS) this.showFPS();
    }
  }
  clearLayer() {
    this.layer.context.clearRect(0, 0, this.layer.width, this.layer.height);
  }
  calculateFPS() {
    let currentTime = performance.now();
    let deltaTime = currentTime - this.lastTime;
    this.fps = Math.round(1000 / deltaTime);
    this.lastTime = currentTime;
  }
  showFPS() {
    this.layer.context.fillStyle = this.options.defaultFont.color;
    this.layer.context.font = this.options.defaultFont.style;
    this.layer.context.textAlign = "left";
    this.layer.context.fillText("FPS: " + this.fpsToShow, 10, 20);
  }
}

onload = () => { window.app = new App(document.body) }