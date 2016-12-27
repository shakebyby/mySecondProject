define("bus/caseOfAction-debug", ["js/jQuery-debug"], function(require, exports, module) {
    var $ = require("js/jQuery-debug"),
        $seach = $("[data-input='search']");
    $seach.on("focus", function(e) {
        $(this).siblings().show(200)
    }).on("blur", function(e) {
        $(this).siblings().hide(200)
    }), $(".sf-search-ul>li").on("mouseenter", function(e) {
        var e = e || window.e;
        e.preventDefault();
        var target = e.target || e.srcElement;
        $(target).addClass("active"), $seach.val($(target).html())
    }).on("mouseleave", function(e) {
        var e = e || window.e;
        e.preventDefault();
        var target = e.target || e.srcElement;
        $(target).removeClass("active")
    });
    var i = -1;
    $("body").on("keydown", function(e) {
        var lis = (e.target, $(".sf-search-ul li"));
        40 == e.keyCode ? (i++, $(lis[i]).addClass("active"), $(lis[i]).siblings().removeClass("active"), $seach.val($(lis[i]).html())) : 38 == e.keyCode && (i--, $(lis[i]).addClass("active"), $(lis[i]).siblings().removeClass("active"), $seach.val($(lis[i]).html()))
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});