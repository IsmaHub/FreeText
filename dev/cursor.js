class Cursor{

    /**
     * have the name of the attribute to identify the cursor element
     */
    _atributte

    /**
     * jquery element of autowriting
     */
    _elemContent


    constructor(elemContent, cursorNumber){
        this._atributte = 'free-text-cursor-'+cursorNumber;
        this._elemContent = $(elemContent);
        this._init();
    }

    /**
     * first function to invoke
     */
    _init(){
        this._insert();
        this._cursor = $('['+this._atributte+']');
        this._addBlink();
    }

    /**
     * insert the cursor in the dom element
     */
    _insert(){
        this._elemContent.append('<span '+this._atributte+'>|</span>');
    }

    /**
     * add the blink effect on cursor
     */
    _addBlink(){
        let e = $('['+this._atributte+']');
        this._blink = window.setInterval(function(){
            e.animate({opacity:'toggle'},200);
        },600);
    }

    /**
     * delete the blink effect
     */
    _removeBlink(){
        clearInterval(this._blink);
    }

    /**
     * hide the cursor
     */
    hideCursor(){
        this._removeBlink();
        this._cursor.hide();
    }
}