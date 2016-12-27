"use strict";
define("bus/main08-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug");
    $(window).resize(function() {
        var width = $(this).width();
        $(this).height();
        width < 992 ? $("#text").removeClass("slideInLeft").addClass("animated slideInUp") : $("#text").removeClass("slideInUp").addClass("animated slideInLeft"), width < 992 ? $("#text2").removeClass("zoomInUp").addClass("animated zoomInLeft") : $("#text2").removeClass("zoomInLeft").addClass("animated zoomInUp"), width < 992 ? $("#text3").removeClass("fadeInDown").addClass("animated fadeInUp") : $("#text3").removeClass("fadeInUp").addClass("animated fadeInDown")
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});