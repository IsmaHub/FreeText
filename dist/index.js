var AutoWriting = (function () {
    function AutoWriting(opt, cursorNumber, cursor) {
        this.cursorNumber = cursorNumber;
        this.element = $(opt.element);
        this.words = opt.words || [];
        this.cursor = cursor;
        this.keepWord = opt.keepWord || 800;
        this.speedDelete = opt.speedDelete || 30;
        this.speedWrite = opt.speedWrite || 100;
        this.hideCursorToEnd = opt.hideCursorToEnd === false ? opt.hideCursorToEnd : true;
        this.stopLoop = false;
        this.isLoop = opt.loop === false ? opt.loop : true;
        this.init(this.element);
    }
    AutoWriting.prototype.init = function (elem) {
        var _this = this;
        this.jndexStart = 0;
        this.indexStart = 0;
        elem.start = this.start;
        elem.setWords = this.setWords;
        this.cursorSelector = $("[free-text-cursor-" + this.cursorNumber + "]");
        this.splitWords = [];
        this.words.forEach(function (word) {
            _this.splitWords.push({ name: word, letters: word.split(''), length: word.length - 1 });
        }, this);
        this.addEvents(elem);
    };
    AutoWriting.prototype.start = function () {
        if (!this.inInterval()) {
            this.startBucle(this.indexStart, this.jndexStart);
        }
        else {
            throw new Error("Can't use start method if It is started currenly. Maybe you want use the restart method");
        }
        return this;
    };
    AutoWriting.prototype["continue"] = function () {
        this.stopLoop = false;
        return this;
    };
    AutoWriting.prototype.removeWord = function (i, j) {
        var _this = this;
        if (!this.isLoop && !this.splitWords[i + 1]) {
            if (this.hideCursorToEnd) {
                this.cursor.hideCursor();
            }
            this.clearIntervals();
            return;
        }
        this.intervalRemove = setInterval(function () {
            _this.inRemoveInterval = true;
            if (!_this.stopLoop) {
                if (_this.splitWords[i].letters[j - 1]) {
                    _this.cursorSelector.prev().remove();
                    j--;
                }
                else {
                    clearInterval(_this.intervalRemove);
                    i++;
                    if (_this.splitWords[i]) {
                        _this.startBucle(i);
                    }
                    else if (_this.isLoop) {
                        _this.startBucle();
                    }
                    else {
                        _this.clearIntervals();
                    }
                }
                return;
            }
        }, this.speedDelete);
    };
    AutoWriting.prototype.startBucle = function (index, jndex) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (jndex === void 0) { jndex = 0; }
        this.indexStart = index;
        this.jndexStart = jndex;
        this.intervalStart = setInterval(function () {
            _this.inStartInterval = true;
            if (!_this.stopLoop) {
                if (!_this.splitWords[_this.indexStart].letters[_this.jndexStart]) {
                    clearInterval(_this.intervalStart);
                    var iStart_1 = _this.indexStart;
                    var jStart_1 = _this.jndexStart;
                    setTimeout(function () {
                        _this.removeWord(iStart_1, jStart_1);
                    }, _this.keepWord);
                    _this.jndexStart = 0;
                    _this.indexStart++;
                    return;
                }
                if (!_this.splitWords[_this.indexStart]) {
                    clearInterval(_this.intervalStart);
                    _this.startBucle();
                    return;
                }
                else {
                    var letter = _this.splitWords[_this.indexStart].letters[_this.jndexStart];
                    $(_this.cursorSelector).before("<span auto-letter-" + _this.cursorNumber + ">" + letter + "</span>");
                    _this.jndexStart++;
                }
            }
        }, this.speedWrite);
    };
    AutoWriting.prototype.stop = function () {
        this.stopLoop = true;
        return this;
    };
    AutoWriting.prototype.inInterval = function () {
        return this.inRemoveInterval || this.inStartInterval;
    };
    AutoWriting.prototype.clearIntervals = function () {
        clearInterval(this.intervalRemove);
        clearInterval(this.intervalStart);
    };
    AutoWriting.prototype.clear = function () {
        this.clearIntervals();
        this.intervalRemove = null;
        this.intervalStart = null;
        this.inRemoveInterval = false;
        this.inStartInterval = false;
        $("[auto-letter-" + this.cursorNumber + "]").remove();
        this.cursorSelector.remove();
        return this;
    };
    AutoWriting.prototype.setWords = function (newWords) {
        if (newWords) {
            this.words = newWords;
        }
        return this;
    };
    AutoWriting.prototype.addEvents = function (e) {
    };
    return AutoWriting;
}());
var Cursor = (function () {
    function Cursor(elemContent, cursorNumber) {
        this.atributte = 'free-text-cursor-' + cursorNumber;
        this.elemContent = $(elemContent);
        this.init();
    }
    Cursor.prototype.init = function () {
        this.insert();
        this.cursorElem = $("[" + this.atributte + "]");
        this.addBlink();
    };
    Cursor.prototype.insert = function () {
        this.elemContent.append("<span " + this.atributte + ">|</span>");
    };
    Cursor.prototype.addBlink = function () {
        var e = $("[" + this.atributte + "]");
        this.blink = window.setInterval(function () {
            e.animate({ opacity: 'toggle' }, 200);
        }, 600);
    };
    Cursor.prototype.removeBlink = function () {
        clearInterval(this.blink);
    };
    Cursor.prototype.hideCursor = function () {
        this.removeBlink();
        this.cursorElem.hide();
    };
    return Cursor;
}());
var FreeText = (function () {
    function FreeText() {
        this.cursorCount = 0;
    }
    FreeText.prototype.autoWriting = function (opt) {
        if (opt.element == null || opt.element == undefined) {
            throw new Error('The param "element" is required');
        }
        var cursor = new Cursor(opt.element, this.cursorCount);
        var aw = new AutoWriting(opt, this.cursorCount, cursor);
        this.cursorCount++;
        return aw;
    };
    return FreeText;
}());
//# sourceMappingURL=index.js.map