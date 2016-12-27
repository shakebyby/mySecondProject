"use strict";
define("module-tools/sftools-debug", [], function(require, exports, module) {
    var sf = {};
    sf.isNull = function(n) {
        return null === n
    }, sf.isUndefined = function(q) {
        return void 0 === q
    };
    "String,Number,Date,Error,Array,RegExp,Math,Boolean,Object,Function".replace(/\w+/g, function(i) {
        sf["is" + i] = function(n) {
            return {}.toString.call(n) === "[object " + i + "]"
        }
    });
    var y = (sf.isString, sf.isNumber, sf.isDate, sf.isError, sf.isArray, sf.isRegExp, sf.isMath, sf.isBoolean, sf.isObject, sf.isFunction, 0);
    ++y;
    var isUtil = sf.Util = function(arr) {
            for (var arr2 = [], i = 0; i < arr.length; i++) arr2.indexOf(arr[i]) == -1 && arr2.push(arr[i]);
            return arr2
        },
        mathRandom = sf.mathRandom = function(min, max) {
            return Math.floor((max - min + 1) * Math.random() + min)
        };
    sf.argumentsToAry = function() {
        return Array.prototype.slice.call(arguments)
    };
    return sf.doubleBall = {
        REDBALL: 6,
        BLUEBALL: 1,
        red: [],
        "double": "",
        randomBlue: function() {
            return mathRandom(1, 16)
        },
        randomRed: function() {
            return mathRandom(1, 33)
        },
        moreRed: function() {
            for (var arr = [], i = 0; i < this.REDBALL; i++) arr[i] = this.randomRed();
            arr = isUtil(arr), this.red = arr
        },
        update: function() {
            var arr = this.red,
                len = this.red.length;
            if (this.red.length < this.REDBALL) {
                for (var i = len; i < this.REDBALL; i++) arr[i] = this.randomRed();
                arr = isUtil(arr), this.red = arr, this.update()
            }
        },
        start: function() {
            var arr = [];
            this.moreRed(), this.update(), arr = this.red.sort(function(a, b) {
                return a - b
            }), arr.push(this.randomBlue()), this["double"] = arr
        }
    }, document.getElementsByTagName("button")[0].onclick = function() {
        document.getElementsByTagName("ul")[0].innerHTML = "", sf.doubleBall.start()
    }, sf
});