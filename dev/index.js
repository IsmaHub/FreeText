let FTX = null;
class FreeText {
    constructor(){
        if(!FTX){
            FTX = this;
        }else{
            throw new Error("Can't instantiate the root FreeText class more than one time. Use FTX object.");
        }
        this._cursorCount = 0;
        return FTX;
    }
    
    autowriting(opt){
        if(opt.element == null || opt.element == undefined){
            throw new Error('The param "element" is required');
        }
        new Cursor(opt.element, this._cursorCount);
        let autowriting = new Autowriting(opt, this._cursorCount);
        this._cursorCount++;
        return autowriting;
    }
}
FTX = new FreeText();