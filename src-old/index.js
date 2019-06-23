/**
 * instance of FreeText object
 */
let FTX = null;

class FreeText {

    /**
     * have the total number of cursors
     */
    _cursorCount

    constructor(){
        if(!FTX){
            FTX = this;
        }else{
            throw new Error("Can't instantiate the root FreeText class more than one time. Use FTX object.");
        }
        this._cursorCount = 0;
        return FTX;
    }
    
    /**
     * return a instance of autowriting object
     * @param {object} opt 
     * @returns {object}
     */
    autowriting(opt){
        if(opt.element == null || opt.element == undefined){
            throw new Error('The param "element" is required');
        }
        let cursor = new Cursor(opt.element, this._cursorCount);
        let autowriting = new Autowriting(opt, this._cursorCount, cursor);
        this._cursorCount++;
        return autowriting;
    }
}
FTX = new FreeText();