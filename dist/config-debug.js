! function() {
    var global = "undefined" == typeof window ? {} : window;
    global.CONFIG = global.CONFIG || {};
    var base = global.CONFIG.assetsLink ? global.CONFIG.assetsLink : "./src",
        config = {
            base: base,
            alias: {
                jQuery: "js/jQuery",
                react: "js/react",
                reactDom: "js/react-dom",
                reflux: "js/reflux",
                reactAlibaba: "//g..com/tinglejs/lib-react/react/0.13.3/react",
                JSXTransformer: "//g.alicdn.com/tinglejs/lib-react/react/0.13.3/JSXTransformer.js",
                masonry: "js/masonry.pkgd",
                handlebars: "js/handlebars-v4.0.5",
                zooming: "js/zooming",
                radialIndicator: "js/radialIndicator",
                knob: "js/jquery.knob"
            },
            path: {
                bootstrap: "bootstrap"
            },
            debug: !0,
            charset: "utf-8",
            map: [
                [".js", ".js?20161219"]
            ]
        };
    return "undefined" != typeof seajs && (seajs.config(config), function(seajs, $) {
        var useList = [],
            arrPro = Array.prototype,
            concat = arrPro.concat,
            slice = arrPro.slice;
        seajs.add = function() {
            return useList = concat.apply(useList, slice.call(arguments))
        }, $(function() {
            var widgetMap = ($("body"), []),
                widgetArr = [];
            $("[widget]").each(function() {
                var self = $(this);
                widgetMap[widgetArr.push(self.attr("widget")) - 1] = self
            }), useList = concat.call(arrPro, widgetArr, useList), useList.length && seajs.use(useList, function() {
                $.each(arguments, function(i) {
                    var element = widgetMap[i],
                        config = {};
                    element && (config[void 0 === element.attr("widget-trigger") ? "element" : "trigger"] = element), "function" == typeof this && new this(config)
                })
            })
        }), $(window).on("load", function() {
            window.isLoaded = !0
        })
    }(seajs, $)), "function" == typeof define && define("config-debug", [], function(require, exports, module) {
        module.exports = config
    }), config
}();