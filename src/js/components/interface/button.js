export class Button {
    constructor(o, app){
        this.options = {
            text: 'SomeButton',
            width: 400,
            height: 173,
            x: 0,
            y: 0,
            bgColor: 'blue',
            sprites: {},
            textures: {},
            textColor: 'white',
            // canvas: null,
            // context: null,
        };
        this.setOptions(o);
        this.app = app;
        this.hover = false;
        this.clicked = false;
        this.sprites = this.options.sprites;
        this.text = this.options.text;
        if(this.text)
        {
            this.font = Object.assign(this.app.options.defaultFont, o.font);
        }
        this.x = this.options.x;
        this.y = this.options.y;
        this.width = this.options.width;
        this.height = this.options.height;
        this.state = 'normal';
        this.currentSprite = this.sprites.normal;
        this.onClick = this.options.onClick || null;
        this.mousemoveHandlerBinded = this.mousemoveHandler.bind(this);
        this.mousedownHandlerBinded = this.mousedownHandler.bind(this);
        this.mouseupHandlerBinded = this.mouseupHandler.bind(this);
        this.app.layer.canvas.addEventListener('mousemove', this.mousemoveHandlerBinded);
        this.app.layer.canvas.addEventListener('mousedown', this.mousedownHandlerBinded);
        this.app.layer.canvas.addEventListener('mouseup', this.mouseupHandlerBinded);
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
        // nothing to do
    }
    display()
    {
        this.app.layer.drawSprite({
            x: this.x,
            y: this.y
        }, this.currentSprite);
        this.drawText();
    }
    drawText() {
        if (this.text)
        {
            this.app.layer.context.fillStyle = this.font.style;
            this.app.layer.context.font = this.font.color;
            this.app.layer.context.textAlign = "center";
            this.app.layer.context.textBaseline = 'middle';
            this.app.layer.context.fillText(this.text, (this.x + (this.width / 2)), (this.y + (this.height / 2)));
        }
        return this;
    }
    getMousePosition(e)
    {
        let rect = this.app.layer.canvas.getBoundingClientRect();
        let x = e.clientX - this.app.layer.canvas.offsetLeft;
        let y = e.clientY - this.app.layer.canvas.offsetTop;
        let res = {
            x: x / this.app.layer.scale,
            y: y / this.app.layer.scale,
        }
        return res;
    }
    isMouseOnButton(e)
    {
        let mousePosition = this.getMousePosition(e);
        return mousePosition.x > this.x && mousePosition.x < this.x + this.width && mousePosition.y < this.y + this.height && mousePosition.y > this.y
    }
    handleSprite() {
        if(this.hover && !this.clicked)
        {
            this.currentSprite = this.sprites.hover;
        }
        if(this.clicked && this.hover)
        {
            this.currentSprite = this.sprites.click;
        }
        if(!this.hover && !this.clicked)
        {
            this.currentSprite = this.sprites.normal;
        }
    }
    mousemoveHandler(e) {
        this.hover = this.isMouseOnButton(e);
        this.handleSprite();
    }
    mousedownHandler(e) {
        this.clicked = this.isMouseOnButton(e);
        this.handleSprite();
    }
    mouseupHandler(e) {
        this.clicked = false;
        if(this.isMouseOnButton(e) && this.onClick && typeof this.onClick === "function")
        {
            this.onClick();
        }
        this.handleSprite();
    }
    removeEventListeners() {
        this.app.layer.canvas.removeEventListener('mousemove', this.mousemoveHandlerBinded);
        this.app.layer.canvas.removeEventListener('mousedown', this.mousedownHandlerBinded);
        this.app.layer.canvas.removeEventListener('mouseup', this.mouseupHandlerBinded);
    }
}