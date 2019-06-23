class TextBlock{
    constructor(opt, cursorNumber){
        this.element = $(opt.element);
        this._cursorNumber = cursorNumber;
        this._focus = opt.focus || false;
        this._bodyElement = $('body');
        this._cursor = $('[free-text-cursor-'+this._cursorNumber+']');
        this._init();
    }

    _init(){
        this._generateEvents();
    }

    _generateEvents(){
        this._eventFocus();
        this._eventKeyDown();
    }

    _eventFocus(){
         this._bodyElement.click((e)=>{
            if (!this.element.is(e.target) && this.element.has(e.target).length === 0){
                this._focus = false;
            }else{
                this._focus = true;
            }
        });
    }

    _eventKeyDown(){
        this._bodyElement.keydown((e)=>{
            if(this._focus){
                this._cursor.before('<span text-letter-'+this._cursorNumber+'>'+e.key+'</span>');
            }
        })
    }

    getText(){

    }

}