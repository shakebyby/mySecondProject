"use strict";
define("bus/drop-debug", ["js/jQuery-debug"], function(require, exports, module) {
    function Drop(clas) {
        this.obj = document.getElementsByClassName(clas)[0], this.xbox = 0, this.ybox = 0
    }
    require("js/jQuery-debug");
    Drop.prototype.init = function() {
        var me = this;
        this.obj.onmousedown = function(e) {
            var e = e || event;
            return me.mouseDown(e), !1
        }
    }, Drop.prototype.mouseDown = function(e) {
        var me = this;
        this.xbox = e.clientX - this.obj.offsetLeft, this.ybox = e.clientY - this.obj.offsetTop, document.onmousemove = function(e) {
            var e = e || window.event;
            me.mouseMove(e)
        }, document.onmouseup = function() {
            me.mouseUp()
        }
    }, Drop.prototype.mouseMove = function(e) {
        this.obj.style.left = e.clientX - this.xbox + "px", this.obj.style.top = e.clientY - this.ybox + "px"
    }, Drop.prototype.mouseUp = function() {
        document.onmousemove = null, document.onmouseup = null
    };
    var drop = new Drop("box");
    drop.init()
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});