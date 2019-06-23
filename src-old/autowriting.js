class Autowriting{

    /**
     * the index of his cursor of the DOM
     */
    _cursorNumber;

    /**
     *the jquery element
     */
    element;

    /**
     * It have the strings that will be write
     */
    _words;

    /**
     *the cursor instance
     */
     _cursor;

    /**
     * the time that will be stay the string printed
     * 
     */
    _keepWord;

    /**
     * the time that will be deleted the string
     */
    _speedDelete;

    /**
     * the time that will be written the string
     */
    _speedWrite;

    /**
     * Indicate if the cursor is hide or not on end
     */
    _hideCursorToEnd

    /**
     *Indicate if is stop the effect
     */
    _stopBucle;

    /**
     * indicate if the autowriting is loop or not
     */
    _isBucle;

    /**
     * jquery element of the cursor
     */
    _cursorSelector

    /**
     * used as indexs
     */
    _jndexStart;
    _indexStart;

    /**
     * array of objects that content the length, all letters and the string of each string of _words
     */
    _splitWords

    constructor(opt, cursorNumber, cursor){
        this._cursorNumber  = cursorNumber;
        this.element        = $(opt.element);
        this._words         = opt.words || [];
        this._cursor        = cursor;
        this._keepWord      = opt.keepWord || 800;
        this._speedDelete   = opt.speedDelete || 30;
        this._speedWrite    = opt.speedWrite || 100;
        this._hideCursorToEnd = opt.hideCursorToEnd === false? opt.hideCursorToEnd : true;
        this._stopBucle     = false;
        this._isBucle       = opt.bucle === false? opt.bucle : true;
        this._init(this.element);
    }

    /**
     * first function invoke
     */
    _init(e){
        this._jndexStart = 0;
        this._indexStart = 0;
        e.start     = this.start;
        e.setWords  = this.setWords;
        this._cursorSelector = $('[free-text-cursor-'+this._cursorNumber+']');
        this._splitWords = [];
        this._words.forEach(function(word) {
           this._splitWords.push({name: word, letters: word.split(''), length: word.length-1});
        }, this);
        this._addEvents(e);
    }
    
    /**
     * start the autowriting effect
     */
    start(){
        if(!this._inInterval()){
            this._startBucle(this._indexStart, this._jndexStart);
        }else{
            throw new Error("Can't use start method if It is started currenly. Maybe you want use the restart method");
        }
        return this;
    }
    
    /**
     * restart the autowriting effect
     */
    continue(){
        this._stopBucle = false;
        return this;
    }

    /**
     * delete the letters of string
     */
    _removeWord(i,j){
        if(!this._isBucle && !this._splitWords[i+1]){
            if(this._hideCursorToEnd){
                this._cursor.hideCursor();
            }
            this._clearIntervals();
            return;
        }
        this._intervalRemove = setInterval(()=>{
            this._inRemoveInterval = true;
            if(!this._stopBucle){
                if(this._splitWords[i].letters[j-1]){
                    this._cursorSelector.prev().remove();
                    j--;
                }else{
                    clearInterval(this._intervalRemove);
                    i++;
                    if(this._splitWords[i]){
                        this._startBucle(i);
                    }else if(this._isBucle){
                            this._startBucle();
                        }else{
                            this._clearIntervals();
                        }
                    }
                    return;
                }
        },this._speedDelete);
    }


    /**
     * start the bucle
     */
    _startBucle(index = 0, jndex = 0){
        this._indexStart = index;
        this._jndexStart = jndex;
        this._intervalStart = setInterval(()=>{
            this._inStartInterval = true;
            if(!this._stopBucle){
                if(!this._splitWords[this._indexStart].letters[this._jndexStart]){
                    clearInterval(this._intervalStart);
                    let iStart = this._indexStart;
                    let jStart = this._jndexStart;
                    setTimeout(()=> {
                        this._removeWord(iStart,jStart);   
                    }, this._keepWord);
                    this._jndexStart = 0;
                    this._indexStart++;
                    return;
                }
                if(!this._splitWords[this._indexStart]){
                    clearInterval(this._intervalStart);
                    this._startBucle();
                    return;
                }else{
                    let letter = this._splitWords[this._indexStart].letters[this._jndexStart];
                    $(this._cursorSelector).before('<span auto-letter-'+this._cursorNumber+'>'+letter+'</span>');
                    this._jndexStart++;
                }
            }
        },this._speedWrite);
    }

    /**
     * pause the animation
     */
    stop(){
        this._stopBucle = true;
        return this;
    }

    /**
     * return true if is one interval active
     */
    _inInterval(){
        return this._inRemoveInterval || this._inStartInterval;
    }

    /**
     * clear all intervals
     */
    _clearIntervals(){
        clearInterval(this._intervalRemove);
        clearInterval(this._intervalStart);
    }

    /**
     * clear the elment of dom and also clear all intervals
     */
    clear(){
        this._clearInftervals();
        this._intervalRemove = null;
        this._intervalStart = null;
        this._inRemoveInterval = false;
        this._inStartInterval = false;
        $('[auto-letter-'+this._cursorNumber+']').remove();
        this._cursorSelector.remove();
        return this;
    }

    /**
     * set the _words variable
     */
    setWords(newWords){
        if(newWords){
            this._words = newWords;
        }
        return this;
    }

    /**
     * TODO
     * add events to dispacth
     */
    _addEvents(e){
    }
}