class Cursor{
    constructor(elemContent, cursorNumber){
        this._atributte = 'free-text-cursor-'+cursorNumber;
        this._elemContent = $(elemContent);
        this._init();
    }

    _init(){
        this._insert();
        this._cursor = $('['+this._atributte+']');
        this._addBlink();
    }

    _insert(){
        this._elemContent.append('<span '+this._atributte+'>|</span>');
    }

    _addBlink(){
        let e = $('['+this._atributte+']');
        this._blink = window.setInterval(function(){
            e.animate({opacity:'toggle'},200);
        },600);
    }

    _removeBlink(){
        clearInterval(this._blink);
    }

    hideCursor(){
        this._removeBlink();
        this._cursor.hide();
    }
}