"use strict";
define("bus/DongHua01-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug");
    $(".on-off").on("click", function(e) {
        $(this).data("onoff") ? ($(this).find("div").css({
            left: "48px"
        }), $(this).css({
            backgroundColor: "#3ccb88"
        }), $(this).data("onoff", !1)) : ($(this).find("div").css({
            left: 0
        }), $(this).css({
            backgroundColor: "#ff4256"
        }), $(this).data("onoff", !0))
    });
    var _hello = "hello";
    _hello.length;
    [1, void 0, 3].map(function() {
        var x = arguments.length <= 0 || void 0 === arguments[0] ? "yes" : arguments[0];
        return x
    });
    var _s = {
        s: 3
    };
    _s.s
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});