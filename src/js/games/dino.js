export class Dino {
    construct(o, app) {
        let _self = this;
        this.app = app;
        this.options = {
            
        };
        if(typeof o === "object")
        {
            this.options = Object.assign(this.options, o);
        }
    }
}