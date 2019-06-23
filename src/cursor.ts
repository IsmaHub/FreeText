
declare const $: any;

class Cursor {
    
    //the name of the attribute to identify the cursor element
    private atributte:string;

    //jquery element of autowriting
    private elemContent: any;

    private cursorElem: any;

    // blink effect
    private blink: any;

    constructor(elemContent: any, cursorNumber: number) {
        this.atributte  = 'free-text-cursor-'+cursorNumber;
        this.elemContent = $(elemContent);
        this.init();
    }

    private init() {
        this.insert();
        this.cursorElem = $(`[${this.atributte}]`);
        this.addBlink();
    }

    /**
     * Inserts the cursor in the dom element
     */
    private insert(){
        this.elemContent.append(`<span ${this.atributte}>|</span>`);
    }

    /**
     * Adds the blink effect on cursor
     */
    private addBlink(){
        let e = $(`[${this.atributte}]`);
        this.blink = window.setInterval(() => {
            e.animate({opacity:'toggle'}, 200);
        },600);
    }

    /**
     * delete the blink effect
     */
    private removeBlink(){
        clearInterval(this.blink);
    }

    /**
     * Hide the cursor
     */
    public hideCursor(){
        this.removeBlink();
        this.cursorElem.hide();
    }

}