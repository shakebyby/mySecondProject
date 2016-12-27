"use strict";

function _possibleConstructorReturn(self, call) {
    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !call || "object" != typeof call && "function" != typeof call ? self : call
}

function _inherits(subClass, superClass) {
    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}
var _get = function get(object, property, receiver) {
        null === object && (object = Function.prototype);
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (void 0 === desc) {
            var parent = Object.getPrototypeOf(object);
            return null === parent ? void 0 : get(parent, property, receiver)
        }
        if ("value" in desc) return desc.value;
        var getter = desc.get;
        if (void 0 !== getter) return getter.call(receiver)
    },
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
    },
    _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
        }
    }();
define("bus/workes6/class-debug", [], function(require, module, exports) {
    function Point(x, y) {
        this.x = x, this.y = y
    }
    Point.prototype.toString = function() {
        return "" + this.x + "," + this.y
    };
    var PointEs6 = (new Point(255, 122), function() {
            function PointEs6(x, y) {
                _classCallCheck(this, PointEs6), this.x = x, this.y = y
            }
            return _createClass(PointEs6, [{
                key: "toString",
                value: function() {
                    return "(" + this.x + "," + this.y + ")"
                }
            }]), PointEs6
        }()),
        p2 = new PointEs6(122, 120);
    Object.assign(PointEs6.prototype, {
        getX: function() {},
        getY: function() {}
    }), p2.getX(), p2.getY();
    var pp2 = new(function() {
        function _class(name) {
            _classCallCheck(this, _class), this.name = name
        }
        return _createClass(_class, [{
            key: "sayName",
            value: function() {}
        }]), _class
    }())("pp2");
    pp2.sayName();
    var father = function() {
            function father(eye, nose, face) {
                _classCallCheck(this, father), this.eye = eye, this.nose = nose, this.face = face
            }
            return _createClass(father, [{
                key: "getPeople",
                value: function() {
                    return this.eye + "big," + this.nose + "small," + this.face + "beautiful."
                }
            }]), father
        }(),
        son = (new father("blue", "steck", "white"), function(_father) {
            function son(eye, nose, face, sex) {
                _classCallCheck(this, son);
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(son).call(this, eye, nose, face));
                return _this.sex = sex, _this
            }
            return _inherits(son, _father), _createClass(son, [{
                key: "getPeople",
                value: function() {
                    return this.sex + "," + _get(Object.getPrototypeOf(son.prototype), "getPeople", this).call(this)
                }
            }]), son
        }(father));
    new son("blue", "steck", "white", "man")
});