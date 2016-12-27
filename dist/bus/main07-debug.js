"use strict";
define("bus/main07-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug");
    $(".shadow-comment").css({
        height: $(".shadow-comment").siblings().get(0).clientHeight + "px",
        width: $(".shadow-comment").siblings().get(0).clientWidth + "px"
    });
    var x, y;
    $(".shadow-father")[0].offsetTop, $(".shadow-father")[0].offsetTop + $(".shadow-father")[0].offsetHeight, $(".shadow-father")[0].offsetLeft, $(".shadow-father")[0].offsetLeft + $(".shadow-father")[0].offsetWidth;
    $(window).on("mousemove", function(e) {
        x = e.pageX, y = e.pageY
    }), $(".shadow-body").mouseenter(function(e) {
        e.preventDefault();
        var x = e.pageX,
            y = e.pageY,
            divTop = $(this).parent()[0].offsetTop,
            divBot = $(this).parent()[0].offsetTop + $(".shadow-father")[0].offsetHeight,
            divLeft = $(this).parent()[0].offsetLeft,
            divRight = $(this).parent()[0].offsetLeft + $(".shadow-father")[0].offsetWidth,
            $div = $(this).siblings();
        divLeft < y < divRight && x > divBot - 10 ? ($div.css({
            left: divRight + "px",
            top: 0
        }), $div.animate({
            left: 0,
            top: 0
        })) : divLeft < y < divRight && x < divTop + 10 ? ($div.css({
            left: -divRight + "px",
            top: 0
        }), $div.animate({
            left: 0,
            top: 0
        })) : divTop < x < divBot && y > divRight - 10 ? ($div.css({
            top: divBot + "px",
            left: 0
        }), $div.animate({
            left: 0,
            top: 0
        })) : divTop < x < divBot && y < divLeft + 10 && ($div.css({
            top: -divBot + "px",
            left: 0
        }), $div.animate({
            left: 0,
            top: 0
        }))
    }), $(".shadow-body").on("mouseleave", function(e) {
        e.preventDefault();
        e.pageX, e.pageY, $(".shadow-father")[0].offsetTop, $(".shadow-father")[0].offsetTop + $(".shadow-father")[0].offsetHeight, $(".shadow-father")[0].offsetLeft, $(".shadow-father")[0].offsetLeft + $(".shadow-father")[0].offsetWidth, $(this).siblings()
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});