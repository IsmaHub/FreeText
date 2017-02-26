'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Autowriting = function () {
    function Autowriting(opt, cursorNumber) {
        _classCallCheck(this, Autowriting);

        this._cursorNumber = cursorNumber;
        this.element = $(opt.element);
        this._words = opt.words || [];
        this._cursors = [];
        this._jndexStart = 0;
        this._indexStart = 0;
        this._keepWord = opt.keepWord || 800;
        this._stopBucle = false;
        this._isBucle = opt.bucle === false ? opt.bucle : true;
        this._init(this.element);
    }

    _createClass(Autowriting, [{
        key: '_init',
        value: function _init(e) {
            e.start = this.start;
            e.setWords = this.setWords;
            this._splitWords = [];
            this._words.forEach(function (word) {
                this._splitWords.push({ name: word, letters: word.split(''), length: word.length - 1 });
            }, this);
            this._addEvents(e);
        }
    }, {
        key: 'start',
        value: function start() {
            if (!this._inInterval()) {
                this._startBucle(this._indexStart, this._jndexStart);
            } else {
                throw new Error("Can't use start method if It is started currenly. Maybe you want use the restart method");
            }
            return this;
        }
    }, {
        key: 'continue',
        value: function _continue() {
            this._stopBucle = false;
            return this;
        }
    }, {
        key: '_removeWord',
        value: function _removeWord(i, j) {
            var _this = this;

            var cursor = $('[free-text-cursor-' + this._cursorNumber + ']');
            if (!this._isBucle && !this._splitWords[i + 1]) {
                this._clearIntervals();
                return;
            }
            this._intervalRemove = setInterval(function () {
                _this._inRemoveInterval = true;
                if (!_this._stopBucle) {
                    if (_this._splitWords[i].letters[j - 1]) {
                        cursor.prev().remove();
                        j--;
                    } else {
                        clearInterval(_this._intervalRemove);
                        i++;
                        if (_this._splitWords[i]) {
                            _this._startBucle(i);
                        } else if (_this._isBucle) {
                            _this._startBucle();
                        } else {
                            _this._clearIntervals();
                        }
                    }
                    return;
                }
            }, 100);
        }
    }, {
        key: '_startBucle',
        value: function _startBucle() {
            var _this2 = this;

            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var jndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var cursor = $('[free-text-cursor-' + this._cursorNumber + ']');
            this._indexStart = index;
            this._jndexStart = jndex;
            this._intervalStart = setInterval(function () {
                _this2._inStartInterval = true;
                if (!_this2._stopBucle) {
                    if (!_this2._splitWords[_this2._indexStart].letters[_this2._jndexStart]) {
                        var _ret = function () {
                            clearInterval(_this2._intervalStart);
                            var iStart = _this2._indexStart;
                            var jStart = _this2._jndexStart;
                            setTimeout(function () {
                                _this2._removeWord(iStart, jStart);
                            }, _this2._keepWord);
                            _this2._jndexStart = 0;
                            _this2._indexStart++;
                            return {
                                v: void 0
                            };
                        }();

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                    if (!_this2._splitWords[_this2._indexStart]) {
                        clearInterval(_this2._intervalStart);
                        _this2._startBucle();
                        return;
                    } else {
                        var letter = _this2._splitWords[_this2._indexStart].letters[_this2._jndexStart];
                        $(cursor).before('<span auto-letter-' + _this2._cursorNumber + '>' + letter + '</span>');
                        _this2._jndexStart++;
                    }
                }
            }, 300);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._stopBucle = true;
            return this;
        }
    }, {
        key: '_inInterval',
        value: function _inInterval() {
            return this._inRemoveInterval || this._inStartInterval;
        }
    }, {
        key: '_clearIntervals',
        value: function _clearIntervals() {
            clearInterval(this._intervalRemove);
            clearInterval(this._intervalStart);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._clearIntervals();
            this._intervalRemove = null;
            this._intervalStart = null;
            this._inRemoveInterval = false;
            this._inStartInterval = false;
            $('[auto-letter-' + this._cursorNumber + ']').remove();
            $('[free-text-cursor-' + this._cursorNumber + ']').remove();
            return this;
        }
    }, {
        key: 'setWords',
        value: function setWords(newWords) {
            if (newWords) {
                this._words = newWords;
            }
            return this;
        }
    }, {
        key: '_addEvents',
        value: function _addEvents(e) {}
    }]);

    return Autowriting;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
    function Cursor(elemContent, cursorNumber) {
        _classCallCheck(this, Cursor);

        this._atributte = 'free-text-cursor-' + cursorNumber;
        this._elemContent = $(elemContent);
        this._init();
    }

    _createClass(Cursor, [{
        key: '_init',
        value: function _init() {
            this._insert();
            this._addBlink();
        }
    }, {
        key: '_insert',
        value: function _insert() {
            this._elemContent.append('<span ' + this._atributte + '>|</span>');
        }
    }, {
        key: '_addBlink',
        value: function _addBlink() {
            var e = $('[' + this._atributte + ']');
            this._blink = window.setInterval(function () {
                e.animate({ opacity: 'toggle' }, 200);
            }, 600);
        }
    }, {
        key: '_removeBlink',
        value: function _removeBlink() {
            clearInterval(this.blink);
        }
    }]);

    return Cursor;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FTX = null;

var FreeText = function () {
    function FreeText() {
        _classCallCheck(this, FreeText);

        if (!FTX) {
            FTX = this;
        } else {
            throw new Error("Can't instantiate the root FreeText class more than one time. Use FTX object.");
        }
        this._cursorCount = 0;
        return FTX;
    }

    _createClass(FreeText, [{
        key: "autowriting",
        value: function autowriting(opt) {
            if (opt.element == null || opt.element == undefined) {
                throw new Error('The param "element" is required');
            }
            new Cursor(opt.element, this._cursorCount);
            var autowriting = new Autowriting(opt, this._cursorCount);
            this._cursorCount++;
            return autowriting;
        }
    }]);

    return FreeText;
}();

FTX = new FreeText();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextBlock = function () {
    function TextBlock(opt, cursorNumber) {
        _classCallCheck(this, TextBlock);

        this.element = $(opt.element);
        this._cursorNumber = cursorNumber;
        this._focus = opt.focus || false;
        this._bodyElement = $('body');
        this._cursor = $('[free-text-cursor-' + this._cursorNumber + ']');
        this._init();
    }

    _createClass(TextBlock, [{
        key: '_init',
        value: function _init() {
            this._generateEvents();
        }
    }, {
        key: '_generateEvents',
        value: function _generateEvents() {
            this._eventFocus();
            this._eventKeyDown();
        }
    }, {
        key: '_eventFocus',
        value: function _eventFocus() {
            var _this = this;

            this._bodyElement.click(function (e) {
                if (!_this.element.is(e.target) && _this.element.has(e.target).length === 0) {
                    _this._focus = false;
                } else {
                    _this._focus = true;
                }
            });
        }
    }, {
        key: '_eventKeyDown',
        value: function _eventKeyDown() {
            var _this2 = this;

            this._bodyElement.keydown(function (e) {
                if (_this2._focus) {
                    _this2._cursor.before('<span text-letter-' + _this2._cursorNumber + '>' + e.key + '</span>');
                }
            });
        }
    }, {
        key: 'getText',
        value: function getText() {}
    }]);

    return TextBlock;
}();
//# sourceMappingURL=maps/index.js.map
