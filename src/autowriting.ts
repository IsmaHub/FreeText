class AutoWriting {


    private intervalRemove: any;
    private intervalStart: any;
    private inRemoveInterval: boolean;
    private inStartInterval: boolean;
    /**
     * The index of his cursor of the DOM
     */
    private cursorNumber: number;

    /**
     * The jquery element
     */
    public element: any;

    /**
     * It has the strings that will be write
     */
    private words: Array<string>;

    /**
     * The cursor instance
     */
     private cursor: any;

    /**
     * the time that will be stay the string printed.
     */
    private keepWord: boolean;

    /**
     * The time that will be deleted the string
     */
    private speedDelete: number;

    /**
     * The time that will be written the string
     */
    private speedWrite: number;

    /**
     * Indicates if the cursor is hide or not on end
     */
    private hideCursorToEnd: boolean;

    /**
     *Indicates if is stop the effect
     */
    private stopLoop: boolean;

    /**
     * Indicates if the autowriting is loop or not
     */
    private isLoop: boolean;

    /**
     * jquery element of the cursor
     */
    private cursorSelector: any;

    /**
     * Used as indexs
     */
    private jndexStart: number;
    private indexStart: number;

    /**
     * Array of objects that contents the length, all letters and the string of each string of words
     */
    private splitWords: Array<any>

    constructor(opt: any, cursorNumber: number, cursor: any){
        this.cursorNumber  = cursorNumber;
        this.element       = $(opt.element);
        this.words         = opt.words || [];
        this.cursor        = cursor;
        this.keepWord      = opt.keepWord || 800;
        this.speedDelete   = opt.speedDelete || 30;
        this.speedWrite    = opt.speedWrite || 100;
        this.hideCursorToEnd = opt.hideCursorToEnd === false? opt.hideCursorToEnd : true;
        this.stopLoop     = false;
        this.isLoop       = opt.loop === false? opt.loop : true;
        this.init(this.element);
    }

    private init(elem: any){
        this.jndexStart = 0;
        this.indexStart = 0;
        elem.start      = this.start;
        elem.setWords   = this.setWords;
        this.cursorSelector = $(`[free-text-cursor-${this.cursorNumber}]`);
        this.splitWords = [];
        this.words.forEach( (word) => {
           this.splitWords.push({name: word, letters: word.split(''), length: word.length-1});
        }, this);
        this.addEvents(elem);
    }

    /**
     * Starts the autowriting effect
     */
    public start(){
        if(!this.inInterval()){
            this.startBucle(this.indexStart, this.jndexStart);
        }else{
            throw new Error("Can't use start method if It is started currenly. Maybe you want use the restart method");
        }
        return this;
    }

    /**
     * Restarts the autowriting effect
     */
    public continue() {
        this.stopLoop = false;
        return this;
    }

    /**
     * delete the letters of string
     */
    private removeWord(i: number, j: number){
        if(!this.isLoop && !this.splitWords[i+1]){
            if(this.hideCursorToEnd){
                this.cursor.hideCursor();
            }
            this.clearIntervals();
            return;
        }
        this.intervalRemove = setInterval(()=>{
            this.inRemoveInterval = true;
            if(!this.stopLoop){
                if(this.splitWords[i].letters[j-1]){
                    this.cursorSelector.prev().remove();
                    j--;
                }else{
                    clearInterval(this.intervalRemove);
                    i++;
                    if(this.splitWords[i]){
                        this.startBucle(i);
                    }else if(this.isLoop){
                            this.startBucle();
                        }else{
                            this.clearIntervals();
                        }
                    }
                    return;
                }
        }, this.speedDelete);
    }

    /**
     * Starts the loop
     */
    private startBucle(index = 0, jndex = 0){
        this.indexStart = index;
        this.jndexStart = jndex;
        this.intervalStart = setInterval(()=>{
            this.inStartInterval = true;
            if(!this.stopLoop){
                if(!this.splitWords[this.indexStart].letters[this.jndexStart]){
                    clearInterval(this.intervalStart);
                    let iStart = this.indexStart;
                    let jStart = this.jndexStart;
                    setTimeout(()=> {
                        this.removeWord(iStart,jStart);   
                    }, this.keepWord);
                    this.jndexStart = 0;
                    this.indexStart++;
                    return;
                }
                if(!this.splitWords[this.indexStart]){
                    clearInterval(this.intervalStart);
                    this.startBucle();
                    return;
                }else{
                    let letter = this.splitWords[this.indexStart].letters[this.jndexStart];
                    $(this.cursorSelector).before(`<span auto-letter-${this.cursorNumber}>${letter}</span>`);
                    this.jndexStart++;
                }
            }
        }, this.speedWrite);
    }

    /**
     * Pause the animation
     */
    public stop(){
        this.stopLoop = true;
        return this;
    }

     /**
     * Return true if is one interval active
     */
    private inInterval(){
        return this.inRemoveInterval || this.inStartInterval;
    }

    /**
     * Clear all intervals
     */
    private clearIntervals(){
        clearInterval(this.intervalRemove);
        clearInterval(this.intervalStart);
    }

    /**
     * Clear the elment of dom and also clear all intervals
     */
    clear(){
        this.clearIntervals();
        this.intervalRemove = null;
        this.intervalStart = null;
        this.inRemoveInterval = false;
        this.inStartInterval = false;
        $(`[auto-letter-${this.cursorNumber}]`).remove();
        this.cursorSelector.remove();
        return this;
    }

    /**
     * set the words variable
     */
    setWords(newWords: Array<string>){
        if(newWords){
            this.words = newWords;
        }
        return this;
    }

    /**
     * TODO
     * Adds events to dispacth
     */
    private addEvents(e: any){
    }
}