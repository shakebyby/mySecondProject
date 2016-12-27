define("bus/main02-debug", ["module-tools/Carousel-debug", "js/jQuery-debug"], function(require, exports, module) {
    require("module-tools/Carousel-debug")
});
define("module-tools/Carousel-debug", ["js/jQuery-debug"], function(require, exports, module) {
    function s() {
        var i = 1;
        return function() {
            $($lisImg[i]).fadeIn(500).siblings().hide(), i++, i == $lisImg.length && (i = 0)
        }
    }
    for (var $ = require("js/jQuery-debug"), $lisImg = $(".carousel-img>ul>li"), $lisRound = $(".carousel-round>ul>li"), i = 0; i < $lisRound.length; i++) $($lisRound[i]).bind("click", function(e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        e.stopPropagation(), e.cancelBubble = !0, $($lisImg[target.getAttribute("data-role")]).fadeIn(500).siblings().hide()
    });
    var timer = null;
    timer = setInterval(s(), 2e3), $(".container-carousel").bind("mouseenter", function(e) {
        clearInterval(timer), timer = null
    }).bind("mouseleave", function(e) {
        timer = setInterval(s(), 2e3)
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});