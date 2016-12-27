define("bus/xscroll-debug", ["js/jQuery-debug"], function(require, exports, module) {
    function foo(obj) {
        "object" == typeof obj && void 0 != obj.add && (this.add = obj.add)
    }
    var $ = require("js/jQuery-debug"),
        imagesTransform = {
            COUNT: $(".sf-adv-images>li").length,
            LEFT: $(".sf-adv").width(),
            lis: $(".sf-adv-images>li"),
            times: 800,
            timer: null,
            setTime: function() {
                var me = this;
                this.timer = setInterval(function() {
                    me.TransFormStart(), me.TransFormEnd()
                }, 1e3)
            },
            init: function() {},
            start: function() {},
            initZindex: function() {
                for (var me = this, i = 0; i < this.lis.length; i++) $(me.lis[i]).css({
                    zIndex: this.lis.length--
                })
            },
            TransFormStart: function() {
                var me = this;
                $(me.lis[0]).animate({
                    left: -me.LEFT / 2 + "px"
                }, me.times), $(me.lis[1]).animate({
                    left: me.LEFT / 2 + "px"
                }, me.times)
            },
            TransFormEnd: function() {
                var me = this;
                $(me.lis[0]).animate({
                    left: 0
                }, me.times), $(me.lis[1]).animate({
                    left: 0
                }, me.times)
            }
        };
    imagesTransform.initZindex(), foo.prototype.add = !0, foo.prototype.addNum = function(a, b) {
        return this.add ? a + b : a - b
    }, foo.prototype.add = !0;
    var sf3 = (new foo({
        add: !1
    }), new foo, new foo);
    sf3.addNum = function(a, b) {
        return a * b
    }
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});