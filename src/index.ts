class FreeText {

    /**
     * It contains the total number of cursors
     */
    private cursorCount: number = 0;

    constructor() { }

    autoWriting(opt: any) {
        if(opt.element == null || opt.element == undefined){
            throw new Error('The param "element" is required');
        }
        const cursor = new Cursor(opt.element, this.cursorCount);
        const aw = new AutoWriting(opt, this.cursorCount, cursor);
        this.cursorCount++;
        return aw;
    }
}