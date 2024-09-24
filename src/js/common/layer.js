export class Layer {
  constructor(container) {

    this.width = 1920;
    this.height = 1080;
    this.defaultBgColor = '#363636';
    this.bgColor = this.defaultBgColor;
    
    this.canvas = document.createElement(`canvas`);
    this.canvas.style.backgroundColor = this.bgColor;
    this.context = this.canvas.getContext(`2d`);
    container.appendChild(this.canvas);

    this.fitToContainer = this.fitToContainer.bind(this);
    addEventListener(`resize`, this.fitToContainer); 
    this.fitToContainer();
  }
  fitToContainer() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.scale = Math.min(this.screenWidth / this.width, this.screenHeight / this.height);
    this.scaledWidth = this.width * this.scale;
    this.scaledHeight = this.height * this.scale;
    this.canvas.width = this.scaledWidth;
    this.canvas.height = this.scaledHeight;
    this.context.scale(this.scale, this.scale);
  }

  drawSprite(o, sprite){
    if(sprite.texture.loaded)
    {
      if ( sprite.options.resize )
      {
        this.context.drawImage(
          sprite.texture.image,
          sprite.currentFrame.x,
          sprite.currentFrame.y,
          sprite.texture.width,
          sprite.texture.height,
          o.x,
          o.y,
          sprite.options.frameWidth,
          sprite.options.frameHeight
        );
      }
      else
      {
        this.context.drawImage(
          sprite.texture.image,
          sprite.currentFrame.x,
          sprite.currentFrame.y,
          sprite.options.frameWidth,
          sprite.options.frameHeight,
          o.x,
          o.y,
          sprite.options.frameWidth,
          sprite.options.frameHeight
        );
      }
    }
  }
}