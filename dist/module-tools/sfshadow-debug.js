define("module-tools/sfshadow-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug"),
        sf = {};
    return sf.shadow = function(obj) {
        function file(event, p) {
            return function() {
                clearInterval(timer1), timer1 = null, timer1 = setInterval(function() {
                    p ? (obj.px--, obj.px <= 0 && (clearInterval(timer1), timer1 = null)) : (obj.px++, obj.px >= px2 && (clearInterval(timer1), timer1 = null)), document.getElementsByClassName("shadow")[0].style.top = obj.px + "px"
                }, obj.ss)
            }
        }
        var timer1 = null,
            div = document.getElementsByClassName("shadow-body")[0],
            px2 = obj.px;
        $(div).mouseenter(function(e) {
            file(e, !0)()
        }), $(div).mouseleave(function(e) {
            file(e, !1)()
        })
    }, sf
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});