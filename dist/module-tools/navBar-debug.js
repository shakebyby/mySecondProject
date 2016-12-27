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
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});