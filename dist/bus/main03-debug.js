define("bus/main03-debug", ["module-tools/Carousel-debug", "js/jQuery-debug", "module-tools/navBar-debug", "module-tools/sfshadow-debug"], function(require, exports, module) {
    require("module-tools/Carousel-debug"), require("module-tools/navBar-debug");
    var sf = require("module-tools/sfshadow-debug");
    sf.shadow({
        px: 250,
        ss: 1
    })
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
define("module-tools/navBar-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug");
    $(function() {
        $(".sf-navbar>li a").click(function(event) {
            event.stopPropagation(), event.cancelBubble = !0;
            var target = event.target || event.srcElement;
            $("ul li a").removeClass("redB"), $(target).addClass("redB");
            var index = target.getAttribute("data-title"),
                id = "#index-" + index;
            $("html,body").animate({
                scrollTop: $(id).offset().top
            }, 500)
        })
    })
});
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