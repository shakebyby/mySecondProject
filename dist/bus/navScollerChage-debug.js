define("bus/navScollerChage-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug"),
        $nav = $("[data-nav='scoller']"),
        topNav = $nav[0].offsetTop;
    $(window).on("scroll", function() {
        var scrollTop = document.body.scrollTop;
        scrollTop >= topNav ? $nav.css({
            position: "fixed",
            top: 0,
            left: 0
        }) : $nav.css({
            position: "absolute",
            top: "370px"
        })
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});