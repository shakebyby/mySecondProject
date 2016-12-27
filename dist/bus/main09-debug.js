define("bus/main09-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug");
    $("[data-dialog]").on("click", function(e) {
        e.stopPropagation(), $("#" + $(e.target).data().dialog).addClass("animated slideInUp").css({
            display: "block"
        })
    }), $("[data-close]").on("click", function(e) {
        e.stopPropagation(), e.cancelBubble = !0;
        var $ele = $("#" + $(e.target).data().close);
        $ele.removeClass("slideInUp animated").addClass("animated slideOutUp"), $ele.is(":animated") || $ele.css({
            display: "none"
        })
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});