"use strict";

define(function (require, exports, module) {
    var $ = require("jQuery");
    $(".on-off").on("click", function (e) {
        console.log($(this).data("onoff"));
        if ($(this).data("onoff")) {
            $(this).find("div").css({
                left: 48 + "px"
            });
            $(this).css({
                backgroundColor: "#3ccb88"
            });
            $(this).data("onoff", false);
        } else {
            $(this).find("div").css({
                left: 0
            });
            $(this).css({
                backgroundColor: "#ff4256"
            });
            $(this).data("onoff", true);
        }
    });
    var _hello = 'hello';
    var len = _hello.length;

    [1, undefined, 3].map(function () {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 'yes' : arguments[0];
        return x;
    });
    console.log(len);
    console.log(length);
    var _s = { s: 3 };
    var ss = _s.s;

    console.log(Boolean.prototype.toString());
    console.log(ss);
});