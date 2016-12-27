! function(window, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], function(jQuery) {
        factory(window, jQuery)
    }) : "object" == typeof module && module.exports ? module.exports = factory(window, require("jquery")) : window.jQueryBridget = factory(window, window.jQuery)
}(window, function(window, jQuery) {
    "use strict";

    function jQueryBridget(namespace, PluginClass, $) {
        function methodCall($elems, methodName, args) {
            var returnValue, pluginMethodStr = "$()." + namespace + '("' + methodName + '")';
            return $elems.each(function(i, elem) {
                var instance = $.data(elem, namespace);
                if (!instance) return void logError(namespace + " not initialized. Cannot call methods, i.e. " + pluginMethodStr);
                var method = instance[methodName];
                if (!method || "_" == methodName.charAt(0)) return void logError(pluginMethodStr + " is not a valid method");
                var value = method.apply(instance, args);
                returnValue = void 0 === returnValue ? value : returnValue
            }), void 0 !== returnValue ? returnValue : $elems
        }

        function plainCall($elems, options) {
            $elems.each(function(i, elem) {
                var instance = $.data(elem, namespace);
                instance ? (instance.option(options), instance._init()) : (instance = new PluginClass(elem, options), $.data(elem, namespace, instance))
            })
        }
        $ = $ || jQuery || window.jQuery, $ && (PluginClass.prototype.option || (PluginClass.prototype.option = function(opts) {
            $.isPlainObject(opts) && (this.options = $.extend(!0, this.options, opts))
        }), $.fn[namespace] = function(arg0) {
            if ("string" == typeof arg0) {
                var args = arraySlice.call(arguments, 1);
                return methodCall(this, arg0, args)
            }
            return plainCall(this, arg0), this
        }, updateJQuery($))
    }

    function updateJQuery($) {
        !$ || $ && $.bridget || ($.bridget = jQueryBridget)
    }
    var arraySlice = Array.prototype.slice,
        console = window.console,
        logError = "undefined" == typeof console ? function() {} : function(message) {
            console.error(message)
        };
    return updateJQuery(jQuery || window.jQuery), jQueryBridget
}),
function(global, factory) {
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], factory) : "object" == typeof module && module.exports ? module.exports = factory() : global.EvEmitter = factory()
}(this, function() {
    function EvEmitter() {}
    var proto = EvEmitter.prototype;
    return proto.on = function(eventName, listener) {
        if (eventName && listener) {
            var events = this._events = this._events || {},
                listeners = events[eventName] = events[eventName] || [];
            return listeners.indexOf(listener) == -1 && listeners.push(listener), this
        }
    }, proto.once = function(eventName, listener) {
        if (eventName && listener) {
            this.on(eventName, listener);
            var onceEvents = this._onceEvents = this._onceEvents || {},
                onceListeners = onceEvents[eventName] = onceEvents[eventName] || [];
            return onceListeners[listener] = !0, this
        }
    }, proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (listeners && listeners.length) {
            var index = listeners.indexOf(listener);
            return index != -1 && listeners.splice(index, 1), this
        }
    }, proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (listeners && listeners.length) {
            var i = 0,
                listener = listeners[i];
            args = args || [];
            for (var onceListeners = this._onceEvents && this._onceEvents[eventName]; listener;) {
                var isOnce = onceListeners && onceListeners[listener];
                isOnce && (this.off(eventName, listener), delete onceListeners[listener]), listener.apply(this, args), i += isOnce ? 0 : 1, listener = listeners[i]
            }
            return this
        }
    }, EvEmitter
}),
function(window, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], function() {
        return factory()
    }) : "object" == typeof module && module.exports ? module.exports = factory() : window.getSize = factory()
}(window, function() {
    "use strict";

    function getStyleSize(value) {
        var num = parseFloat(value),
            isValid = value.indexOf("%") == -1 && !isNaN(num);
        return isValid && num
    }

    function noop() {}

    function getZeroSize() {
        for (var size = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, i = 0; i < measurementsLength; i++) {
            var measurement = measurements[i];
            size[measurement] = 0
        }
        return size
    }

    function getStyle(elem) {
        var style = getComputedStyle(elem);
        return style || logError("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), style
    }

    function setup() {
        if (!isSetup) {
            isSetup = !0;
            var div = document.createElement("div");
            div.style.width = "200px", div.style.padding = "1px 2px 3px 4px", div.style.borderStyle = "solid", div.style.borderWidth = "1px 2px 3px 4px", div.style.boxSizing = "border-box";
            var body = document.body || document.documentElement;
            body.appendChild(div);
            var style = getStyle(div);
            getSize.isBoxSizeOuter = isBoxSizeOuter = 200 == getStyleSize(style.width), body.removeChild(div)
        }
    }

    function getSize(elem) {
        if (setup(), "string" == typeof elem && (elem = document.querySelector(elem)), elem && "object" == typeof elem && elem.nodeType) {
            var style = getStyle(elem);
            if ("none" == style.display) return getZeroSize();
            var size = {};
            size.width = elem.offsetWidth, size.height = elem.offsetHeight;
            for (var isBorderBox = size.isBorderBox = "border-box" == style.boxSizing, i = 0; i < measurementsLength; i++) {
                var measurement = measurements[i],
                    value = style[measurement],
                    num = parseFloat(value);
                size[measurement] = isNaN(num) ? 0 : num
            }
            var paddingWidth = size.paddingLeft + size.paddingRight,
                paddingHeight = size.paddingTop + size.paddingBottom,
                marginWidth = size.marginLeft + size.marginRight,
                marginHeight = size.marginTop + size.marginBottom,
                borderWidth = size.borderLeftWidth + size.borderRightWidth,
                borderHeight = size.borderTopWidth + size.borderBottomWidth,
                isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter,
                styleWidth = getStyleSize(style.width);
            styleWidth !== !1 && (size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth));
            var styleHeight = getStyleSize(style.height);
            return styleHeight !== !1 && (size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)), size.innerWidth = size.width - (paddingWidth + borderWidth), size.innerHeight = size.height - (paddingHeight + borderHeight), size.outerWidth = size.width + marginWidth, size.outerHeight = size.height + marginHeight, size
        }
    }
    var isBoxSizeOuter, logError = "undefined" == typeof console ? noop : function(message) {},
        measurements = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        measurementsLength = measurements.length,
        isSetup = !1;
    return getSize
}),
function(window, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], factory) : "object" == typeof module && module.exports ? module.exports = factory() : window.matchesSelector = factory()
}(window, function() {
    "use strict";
    var matchesMethod = function() {
        var ElemProto = Element.prototype;
        if (ElemProto.matches) return "matches";
        if (ElemProto.matchesSelector) return "matchesSelector";
        for (var prefixes = ["webkit", "moz", "ms", "o"], i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i],
                method = prefix + "MatchesSelector";
            if (ElemProto[method]) return method
        }
    }();
    return function(elem, selector) {
        return elem[matchesMethod](selector)
    }
}),
function(window, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], function(matchesSelector) {
        return factory(window, matchesSelector)
    }) : "object" == typeof module && module.exports ? module.exports = factory(window, require("desandro-matches-selector")) : window.fizzyUIUtils = factory(window, window.matchesSelector)
}(window, function(window, matchesSelector) {
    var utils = {};
    utils.extend = function(a, b) {
        for (var prop in b) a[prop] = b[prop];
        return a
    }, utils.modulo = function(num, div) {
        return (num % div + div) % div
    }, utils.makeArray = function(obj) {
        var ary = [];
        if (Array.isArray(obj)) ary = obj;
        else if (obj && "number" == typeof obj.length)
            for (var i = 0; i < obj.length; i++) ary.push(obj[i]);
        else ary.push(obj);
        return ary
    }, utils.removeFrom = function(ary, obj) {
        var index = ary.indexOf(obj);
        index != -1 && ary.splice(index, 1)
    }, utils.getParent = function(elem, selector) {
        for (; elem != document.body;)
            if (elem = elem.parentNode, matchesSelector(elem, selector)) return elem
    }, utils.getQueryElement = function(elem) {
        return "string" == typeof elem ? document.querySelector(elem) : elem
    }, utils.handleEvent = function(event) {
        var method = "on" + event.type;
        this[method] && this[method](event)
    }, utils.filterFindElements = function(elems, selector) {
        elems = utils.makeArray(elems);
        var ffElems = [];
        return elems.forEach(function(elem) {
            if (elem instanceof HTMLElement) {
                if (!selector) return void ffElems.push(elem);
                matchesSelector(elem, selector) && ffElems.push(elem);
                for (var childElems = elem.querySelectorAll(selector), i = 0; i < childElems.length; i++) ffElems.push(childElems[i])
            }
        }), ffElems
    }, utils.debounceMethod = function(_class, methodName, threshold) {
        var method = _class.prototype[methodName],
            timeoutName = methodName + "Timeout";
        _class.prototype[methodName] = function() {
            var timeout = this[timeoutName];
            timeout && clearTimeout(timeout);
            var args = arguments,
                _this = this;
            this[timeoutName] = setTimeout(function() {
                method.apply(_this, args), delete _this[timeoutName]
            }, threshold || 100)
        }
    }, utils.docReady = function(callback) {
        "complete" == document.readyState ? callback() : document.addEventListener("DOMContentLoaded", callback)
    }, utils.toDashed = function(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + "-" + $2
        }).toLowerCase()
    };
    var console = window.console;
    return utils.htmlInit = function(WidgetClass, namespace) {
        utils.docReady(function() {
            var dashedNamespace = utils.toDashed(namespace),
                dataAttr = "data-" + dashedNamespace,
                dataAttrElems = document.querySelectorAll("[" + dataAttr + "]"),
                jsDashElems = document.querySelectorAll(".js-" + dashedNamespace),
                elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems)),
                dataOptionsAttr = dataAttr + "-options",
                jQuery = window.jQuery;
            elems.forEach(function(elem) {
                var options, attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
                try {
                    options = attr && JSON.parse(attr)
                } catch (error) {
                    return void(console && console.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error))
                }
                var instance = new WidgetClass(elem, options);
                jQuery && jQuery.data(elem, namespace, instance)
            })
        })
    }, utils
}),
function(window, factory) {
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], function(EvEmitter, getSize) {
        return factory(window, EvEmitter, getSize)
    }) : "object" == typeof module && module.exports ? module.exports = factory(window, require("ev-emitter"), require("get-size")) : (window.Outlayer = {}, window.Outlayer.Item = factory(window, window.EvEmitter, window.getSize))
}(window, function(window, EvEmitter, getSize) {
    "use strict";

    function isEmptyObj(obj) {
        for (var prop in obj) return !1;
        return prop = null, !0
    }

    function Item(element, layout) {
        element && (this.element = element, this.layout = layout, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function($1) {
            return "-" + $1.toLowerCase()
        })
    }
    var docElemStyle = document.documentElement.style,
        transitionProperty = "string" == typeof docElemStyle.transition ? "transition" : "WebkitTransition",
        transformProperty = "string" == typeof docElemStyle.transform ? "transform" : "WebkitTransform",
        transitionEndEvent = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[transitionProperty],
        vendorProperties = [transformProperty, transitionProperty, transitionProperty + "Duration", transitionProperty + "Property"],
        proto = Item.prototype = Object.create(EvEmitter.prototype);
    proto.constructor = Item, proto._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, proto.handleEvent = function(event) {
        var method = "on" + event.type;
        this[method] && this[method](event)
    }, proto.getSize = function() {
        this.size = getSize(this.element)
    }, proto.css = function(style) {
        var elemStyle = this.element.style;
        for (var prop in style) {
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop]
        }
    }, proto.getPosition = function() {
        var style = getComputedStyle(this.element),
            isOriginLeft = this.layout._getOption("originLeft"),
            isOriginTop = this.layout._getOption("originTop"),
            xValue = style[isOriginLeft ? "left" : "right"],
            yValue = style[isOriginTop ? "top" : "bottom"],
            layoutSize = this.layout.size,
            x = xValue.indexOf("%") != -1 ? parseFloat(xValue) / 100 * layoutSize.width : parseInt(xValue, 10),
            y = yValue.indexOf("%") != -1 ? parseFloat(yValue) / 100 * layoutSize.height : parseInt(yValue, 10);
        x = isNaN(x) ? 0 : x, y = isNaN(y) ? 0 : y, x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight, y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom, this.position.x = x, this.position.y = y
    }, proto.layoutPosition = function() {
        var layoutSize = this.layout.size,
            style = {},
            isOriginLeft = this.layout._getOption("originLeft"),
            isOriginTop = this.layout._getOption("originTop"),
            xPadding = isOriginLeft ? "paddingLeft" : "paddingRight",
            xProperty = isOriginLeft ? "left" : "right",
            xResetProperty = isOriginLeft ? "right" : "left",
            x = this.position.x + layoutSize[xPadding];
        style[xProperty] = this.getXValue(x), style[xResetProperty] = "";
        var yPadding = isOriginTop ? "paddingTop" : "paddingBottom",
            yProperty = isOriginTop ? "top" : "bottom",
            yResetProperty = isOriginTop ? "bottom" : "top",
            y = this.position.y + layoutSize[yPadding];
        style[yProperty] = this.getYValue(y), style[yResetProperty] = "", this.css(style), this.emitEvent("layout", [this])
    }, proto.getXValue = function(x) {
        var isHorizontal = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px"
    }, proto.getYValue = function(y) {
        var isHorizontal = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px"
    }, proto._transitionTo = function(x, y) {
        this.getPosition();
        var curX = this.position.x,
            curY = this.position.y,
            compareX = parseInt(x, 10),
            compareY = parseInt(y, 10),
            didNotMove = compareX === this.position.x && compareY === this.position.y;
        if (this.setPosition(x, y), didNotMove && !this.isTransitioning) return void this.layoutPosition();
        var transX = x - curX,
            transY = y - curY,
            transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY), this.transition({
            to: transitionStyle,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, proto.getTranslate = function(x, y) {
        var isOriginLeft = this.layout._getOption("originLeft"),
            isOriginTop = this.layout._getOption("originTop");
        return x = isOriginLeft ? x : -x, y = isOriginTop ? y : -y, "translate3d(" + x + "px, " + y + "px, 0)"
    }, proto.goTo = function(x, y) {
        this.setPosition(x, y), this.layoutPosition()
    }, proto.moveTo = proto._transitionTo, proto.setPosition = function(x, y) {
        this.position.x = parseInt(x, 10), this.position.y = parseInt(y, 10)
    }, proto._nonTransition = function(args) {
        this.css(args.to), args.isCleaning && this._removeStyles(args.to);
        for (var prop in args.onTransitionEnd) args.onTransitionEnd[prop].call(this)
    }, proto._transition = function(args) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(args);
        var _transition = this._transn;
        for (var prop in args.onTransitionEnd) _transition.onEnd[prop] = args.onTransitionEnd[prop];
        for (prop in args.to) _transition.ingProperties[prop] = !0, args.isCleaning && (_transition.clean[prop] = !0);
        if (args.from) {
            this.css(args.from);
            var h = this.element.offsetHeight;
            h = null
        }
        this.enableTransition(args.to), this.css(args.to), this.isTransitioning = !0
    };
    var transitionProps = "opacity," + toDashedAll(vendorProperties.transform || "transform");
    proto.enableTransition = function() {
        this.isTransitioning || (this.css({
            transitionProperty: transitionProps,
            transitionDuration: this.layout.options.transitionDuration
        }), this.element.addEventListener(transitionEndEvent, this, !1))
    }, proto.transition = Item.prototype[transitionProperty ? "_transition" : "_nonTransition"], proto.onwebkitTransitionEnd = function(event) {
        this.ontransitionend(event)
    }, proto.onotransitionend = function(event) {
        this.ontransitionend(event)
    };
    var dashedVendorProperties = {
        "-webkit-transform": "transform"
    };
    proto.ontransitionend = function(event) {
        if (event.target === this.element) {
            var _transition = this._transn,
                propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
            if (delete _transition.ingProperties[propertyName], isEmptyObj(_transition.ingProperties) && this.disableTransition(), propertyName in _transition.clean && (this.element.style[event.propertyName] = "", delete _transition.clean[propertyName]), propertyName in _transition.onEnd) {
                var onTransitionEnd = _transition.onEnd[propertyName];
                onTransitionEnd.call(this), delete _transition.onEnd[propertyName]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, proto.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(transitionEndEvent, this, !1), this.isTransitioning = !1
    }, proto._removeStyles = function(style) {
        var cleanStyle = {};
        for (var prop in style) cleanStyle[prop] = "";
        this.css(cleanStyle)
    };
    var cleanTransitionStyle = {
        transitionProperty: "",
        transitionDuration: ""
    };
    return proto.removeTransitionStyles = function() {
        this.css(cleanTransitionStyle)
    }, proto.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, proto.remove = function() {
        return transitionProperty && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, proto.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var options = this.layout.options,
            onTransitionEnd = {},
            transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd, this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: onTransitionEnd
        })
    }, proto.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, proto.getHideRevealTransitionEndProperty = function(styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        if (optionStyle.opacity) return "opacity";
        for (var prop in optionStyle) return prop
    }, proto.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var options = this.layout.options,
            onTransitionEnd = {},
            transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd, this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: onTransitionEnd
        })
    }, proto.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, proto.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, Item
}),
function(window, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], function(EvEmitter, getSize, utils, Item) {
        return factory(window, EvEmitter, getSize, utils, Item)
    }) : "object" == typeof module && module.exports ? module.exports = factory(window, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item)
}(window, function(window, EvEmitter, getSize, utils, Item) {
    "use strict";

    function Outlayer(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) return void(console && console.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element)));
        this.element = queryElement, jQuery && (this.$element = jQuery(this.element)), this.options = utils.extend({}, this.constructor.defaults), this.option(options);
        var id = ++GUID;
        this.element.outlayerGUID = id, instances[id] = this, this._create();
        var isInitLayout = this._getOption("initLayout");
        isInitLayout && this.layout()
    }

    function subclass(Parent) {
        function SubClass() {
            Parent.apply(this, arguments)
        }
        return SubClass.prototype = Object.create(Parent.prototype), SubClass.prototype.constructor = SubClass, SubClass
    }
    var console = window.console,
        jQuery = window.jQuery,
        noop = function() {},
        GUID = 0,
        instances = {};
    Outlayer.namespace = "outlayer", Outlayer.Item = Item, Outlayer.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var proto = Outlayer.prototype;
    return utils.extend(proto, EvEmitter.prototype), proto.option = function(opts) {
        utils.extend(this.options, opts)
    }, proto._getOption = function(option) {
        var oldOption = this.constructor.compatOptions[option];
        return oldOption && void 0 !== this.options[oldOption] ? this.options[oldOption] : this.options[option]
    }, Outlayer.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, proto._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), utils.extend(this.element.style, this.options.containerStyle);
        var canBindResize = this._getOption("resize");
        canBindResize && this.bindResize()
    }, proto.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, proto._itemize = function(elems) {
        for (var itemElems = this._filterFindItemElements(elems), Item = this.constructor.Item, items = [], i = 0; i < itemElems.length; i++) {
            var elem = itemElems[i],
                item = new Item(elem, this);
            items.push(item)
        }
        return items
    }, proto._filterFindItemElements = function(elems) {
        return utils.filterFindElements(elems, this.options.itemSelector)
    }, proto.getItemElements = function() {
        return this.items.map(function(item) {
            return item.element
        })
    }, proto.layout = function() {
        this._resetLayout(), this._manageStamps();
        var layoutInstant = this._getOption("layoutInstant"),
            isInstant = void 0 !== layoutInstant ? layoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant), this._isLayoutInited = !0
    }, proto._init = proto.layout, proto._resetLayout = function() {
        this.getSize()
    }, proto.getSize = function() {
        this.size = getSize(this.element)
    }, proto._getMeasurement = function(measurement, size) {
        var elem, option = this.options[measurement];
        option ? ("string" == typeof option ? elem = this.element.querySelector(option) : option instanceof HTMLElement && (elem = option), this[measurement] = elem ? getSize(elem)[size] : option) : this[measurement] = 0
    }, proto.layoutItems = function(items, isInstant) {
        items = this._getItemsForLayout(items), this._layoutItems(items, isInstant), this._postLayout()
    }, proto._getItemsForLayout = function(items) {
        return items.filter(function(item) {
            return !item.isIgnored
        })
    }, proto._layoutItems = function(items, isInstant) {
        if (this._emitCompleteOnItems("layout", items), items && items.length) {
            var queue = [];
            items.forEach(function(item) {
                var position = this._getItemLayoutPosition(item);
                position.item = item, position.isInstant = isInstant || item.isLayoutInstant, queue.push(position)
            }, this), this._processLayoutQueue(queue)
        }
    }, proto._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, proto._processLayoutQueue = function(queue) {
        queue.forEach(function(obj) {
            this._positionItem(obj.item, obj.x, obj.y, obj.isInstant)
        }, this)
    }, proto._positionItem = function(item, x, y, isInstant) {
        isInstant ? item.goTo(x, y) : item.moveTo(x, y)
    }, proto._postLayout = function() {
        this.resizeContainer()
    }, proto.resizeContainer = function() {
        var isResizingContainer = this._getOption("resizeContainer");
        if (isResizingContainer) {
            var size = this._getContainerSize();
            size && (this._setContainerMeasure(size.width, !0), this._setContainerMeasure(size.height, !1))
        }
    }, proto._getContainerSize = noop, proto._setContainerMeasure = function(measure, isWidth) {
        if (void 0 !== measure) {
            var elemSize = this.size;
            elemSize.isBorderBox && (measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth), measure = Math.max(measure, 0), this.element.style[isWidth ? "width" : "height"] = measure + "px"
        }
    }, proto._emitCompleteOnItems = function(eventName, items) {
        function onComplete() {
            _this.dispatchEvent(eventName + "Complete", null, [items])
        }

        function tick() {
            doneCount++, doneCount == count && onComplete()
        }
        var _this = this,
            count = items.length;
        if (!items || !count) return void onComplete();
        var doneCount = 0;
        items.forEach(function(item) {
            item.once(eventName, tick)
        })
    }, proto.dispatchEvent = function(type, event, args) {
        var emitArgs = event ? [event].concat(args) : args;
        if (this.emitEvent(type, emitArgs), jQuery)
            if (this.$element = this.$element || jQuery(this.element), event) {
                var $event = jQuery.Event(event);
                $event.type = type, this.$element.trigger($event, args)
            } else this.$element.trigger(type, args)
    }, proto.ignore = function(elem) {
        var item = this.getItem(elem);
        item && (item.isIgnored = !0)
    }, proto.unignore = function(elem) {
        var item = this.getItem(elem);
        item && delete item.isIgnored
    }, proto.stamp = function(elems) {
        elems = this._find(elems), elems && (this.stamps = this.stamps.concat(elems), elems.forEach(this.ignore, this))
    }, proto.unstamp = function(elems) {
        elems = this._find(elems), elems && elems.forEach(function(elem) {
            utils.removeFrom(this.stamps, elem), this.unignore(elem)
        }, this)
    }, proto._find = function(elems) {
        if (elems) return "string" == typeof elems && (elems = this.element.querySelectorAll(elems)), elems = utils.makeArray(elems)
    }, proto._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, proto._getBoundingRect = function() {
        var boundingRect = this.element.getBoundingClientRect(),
            size = this.size;
        this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        }
    }, proto._manageStamp = noop, proto._getElementOffset = function(elem) {
        var boundingRect = elem.getBoundingClientRect(),
            thisRect = this._boundingRect,
            size = getSize(elem),
            offset = {
                left: boundingRect.left - thisRect.left - size.marginLeft,
                top: boundingRect.top - thisRect.top - size.marginTop,
                right: thisRect.right - boundingRect.right - size.marginRight,
                bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
            };
        return offset
    }, proto.handleEvent = utils.handleEvent, proto.bindResize = function() {
        window.addEventListener("resize", this), this.isResizeBound = !0
    }, proto.unbindResize = function() {
        window.removeEventListener("resize", this), this.isResizeBound = !1
    }, proto.onresize = function() {
        this.resize()
    }, utils.debounceMethod(Outlayer, "onresize", 100), proto.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, proto.needsResizeLayout = function() {
        var size = getSize(this.element),
            hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth
    }, proto.addItems = function(elems) {
        var items = this._itemize(elems);
        return items.length && (this.items = this.items.concat(items)), items
    }, proto.appended = function(elems) {
        var items = this.addItems(elems);
        items.length && (this.layoutItems(items, !0), this.reveal(items))
    }, proto.prepended = function(elems) {
        var items = this._itemize(elems);
        if (items.length) {
            var previousItems = this.items.slice(0);
            this.items = items.concat(previousItems), this._resetLayout(), this._manageStamps(), this.layoutItems(items, !0), this.reveal(items), this.layoutItems(previousItems)
        }
    }, proto.reveal = function(items) {
        this._emitCompleteOnItems("reveal", items), items && items.length && items.forEach(function(item) {
            item.reveal()
        })
    }, proto.hide = function(items) {
        this._emitCompleteOnItems("hide", items), items && items.length && items.forEach(function(item) {
            item.hide()
        })
    }, proto.revealItemElements = function(elems) {
        var items = this.getItems(elems);
        this.reveal(items)
    }, proto.hideItemElements = function(elems) {
        var items = this.getItems(elems);
        this.hide(items)
    }, proto.getItem = function(elem) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.element == elem) return item
        }
    }, proto.getItems = function(elems) {
        elems = utils.makeArray(elems);
        var items = [];
        return elems.forEach(function(elem) {
            var item = this.getItem(elem);
            item && items.push(item)
        }, this), items
    }, proto.remove = function(elems) {
        var removeItems = this.getItems(elems);
        this._emitCompleteOnItems("remove", removeItems), removeItems && removeItems.length && removeItems.forEach(function(item) {
            item.remove(), utils.removeFrom(this.items, item)
        }, this)
    }, proto.destroy = function() {
        var style = this.element.style;
        style.height = "", style.position = "", style.width = "", this.items.forEach(function(item) {
            item.destroy()
        }), this.unbindResize();
        var id = this.element.outlayerGUID;
        delete instances[id], delete this.element.outlayerGUID, jQuery && jQuery.removeData(this.element, this.constructor.namespace)
    }, Outlayer.data = function(elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id]
    }, Outlayer.create = function(namespace, options) {
        var Layout = subclass(Outlayer);
        return Layout.defaults = utils.extend({}, Outlayer.defaults), utils.extend(Layout.defaults, options), Layout.compatOptions = utils.extend({}, Outlayer.compatOptions), Layout.namespace = namespace, Layout.data = Outlayer.data, Layout.Item = subclass(Item), utils.htmlInit(Layout, namespace), jQuery && jQuery.bridget && jQuery.bridget(namespace, Layout), Layout
    }, Outlayer.Item = Item, Outlayer
}),
function(window, factory) {
    "function" == typeof define && define.amd ? define("js/masonry-debug.pkgd", ["jquery-debug"], factory) : "object" == typeof module && module.exports ? module.exports = factory(require("outlayer"), require("get-size")) : window.Masonry = factory(window.Outlayer, window.getSize)
}(window, function(Outlayer, getSize) {
    var Masonry = Outlayer.create("masonry");
    return Masonry.compatOptions.fitWidth = "isFitWidth", Masonry.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var i = 0; i < this.cols; i++) this.colYs.push(0);
        this.maxY = 0
    }, Masonry.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var firstItem = this.items[0],
                firstItemElem = firstItem && firstItem.element;
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth
        }
        var columnWidth = this.columnWidth += this.gutter,
            containerWidth = this.containerWidth + this.gutter,
            cols = containerWidth / columnWidth,
            excess = columnWidth - containerWidth % columnWidth,
            mathMethod = excess && excess < 1 ? "round" : "floor";
        cols = Math[mathMethod](cols), this.cols = Math.max(cols, 1)
    }, Masonry.prototype.getContainerWidth = function() {
        var isFitWidth = this._getOption("fitWidth"),
            container = isFitWidth ? this.element.parentNode : this.element,
            size = getSize(container);
        this.containerWidth = size && size.innerWidth
    }, Masonry.prototype._getItemLayoutPosition = function(item) {
        item.getSize();
        var remainder = item.size.outerWidth % this.columnWidth,
            mathMethod = remainder && remainder < 1 ? "round" : "ceil",
            colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);
        for (var colGroup = this._getColGroup(colSpan), minimumY = Math.min.apply(Math, colGroup), shortColIndex = colGroup.indexOf(minimumY), position = {
                x: this.columnWidth * shortColIndex,
                y: minimumY
            }, setHeight = minimumY + item.size.outerHeight, setSpan = this.cols + 1 - colGroup.length, i = 0; i < setSpan; i++) this.colYs[shortColIndex + i] = setHeight;
        return position
    }, Masonry.prototype._getColGroup = function(colSpan) {
        if (colSpan < 2) return this.colYs;
        for (var colGroup = [], groupCount = this.cols + 1 - colSpan, i = 0; i < groupCount; i++) {
            var groupColYs = this.colYs.slice(i, i + colSpan);
            colGroup[i] = Math.max.apply(Math, groupColYs)
        }
        return colGroup
    }, Masonry.prototype._manageStamp = function(stamp) {
        var stampSize = getSize(stamp),
            offset = this._getElementOffset(stamp),
            isOriginLeft = this._getOption("originLeft"),
            firstX = isOriginLeft ? offset.left : offset.right,
            lastX = firstX + stampSize.outerWidth,
            firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        lastCol -= lastX % this.columnWidth ? 0 : 1, lastCol = Math.min(this.cols - 1, lastCol);
        for (var isOriginTop = this._getOption("originTop"), stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight, i = firstCol; i <= lastCol; i++) this.colYs[i] = Math.max(stampMaxY, this.colYs[i])
    }, Masonry.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (size.width = this._getContainerFitWidth()), size
    }, Masonry.prototype._getContainerFitWidth = function() {
        for (var unusedCols = 0, i = this.cols; --i && 0 === this.colYs[i];) unusedCols++;
        return (this.cols - unusedCols) * this.columnWidth - this.gutter
    }, Masonry.prototype.needsResizeLayout = function() {
        var previousWidth = this.containerWidth;
        return this.getContainerWidth(), previousWidth != this.containerWidth
    }, Masonry
});