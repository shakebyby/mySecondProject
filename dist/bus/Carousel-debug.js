define("bus/Carousel-debug", ["js/jQuery-debug"], function(require, exports, module) {
    function s() {
        var i = 0;
        return function() {
            $($lisImg[i]).show(500).siblings().hide(), i++, 5 == i && (i = 0)
        }
    }
    for (var $ = require("js/jQuery-debug"), $lisImg = $(".carousel-img>ul>li"), $lisRound = $(".carousel-round>ul>li"), i = 0; i < $lisRound.length; i++) $($lisRound[i]).bind("click", function(e) {
        var e = event || window.event,
            target = e.target || e.srcElement;
        e.stopPropagation(), e.cancelBubble = !0, $($lisImg[target.getAttribute("data-role")]).show(500).siblings().hide()
    });
    var timer = null;
    timer = setInterval(s(), 2e3), $(".container-carousel").bind("mouseover", function(e) {
        clearInterval(timer)
    }).bind("mouseout", function(e) {
        timer = setInterval(s(), 2e3)
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});