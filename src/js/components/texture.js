export class Texture {
    constructor(o, app){
        this.options = o;
        this.app = app;
        this.width = null;
        this.height = null;
        this.loaded = false;
        this.url = this.options.imageUrl;
        let _self = this;

        this.image = new Image();
        this.image.onload = function() {
            l('_self.url', _self.url)
            l('_self.app.loader.textures', _self.app.loader.textures);
            l('_self.app.loader.textures[_self.url]', _self.app.loader.textures[_self.url]);
            l('_self.app.loader.texturesCount', _self.app.loader.texturesCount);
            if(_self.app.loader.textures[_self.url] && _self.app.loader.texturesCount)
            {
                l('fire');
                _self.app.loader.texturesCount = _self.app.loader.texturesCount - 1;
            }
            _self.width  = this.width;
            _self.height = this.height;
            _self.loaded = true;
        }
        this.image.src = this.options.imageUrl;
    }
}