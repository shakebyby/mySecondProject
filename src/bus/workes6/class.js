"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, module, exports) {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString = function () {
        return "" + this.x + "," + this.y;
    };
    var p = new Point(255, 122);
    console.log(p);
    console.log(p.toString());

    var PointEs6 = function () {
        function PointEs6(x, y) {
            _classCallCheck(this, PointEs6);

            this.x = x;
            this.y = y;
        }

        _createClass(PointEs6, [{
            key: "toString",
            value: function toString() {
                return "(" + this.x + "," + this.y + ")";
            }
        }]);

        return PointEs6;
    }();

    var p2 = new PointEs6(122, 120);
    console.log(p2);
    console.log(p2.toString());
    console.log(typeof p2 === "undefined" ? "undefined" : _typeof(p2));
    console.log(typeof PointEs6 === "undefined" ? "undefined" : _typeof(PointEs6));
    console.log(PointEs6 === PointEs6.prototype.constructor);
    // 拓展方法
    Object.assign(PointEs6.prototype, {
        getX: function getX() {
            console.log(this.x);
        },
        getY: function getY() {
            console.log(this.y);
        }
    });
    p2.getX();
    p2.getY();
    console.log(Object.keys(PointEs6.prototype));
    console.log(Object.getOwnPropertyNames(PointEs6.prototype));
    console.log(Object.keys(Point.prototype));
    console.log(Object.getOwnPropertyNames(Point.prototype));
    // const MyClass = class me{
    //     getClassName(){
    //         return  Me.name
    //     }
    // };
    // let inst = new MyClass();
    // console.log(inst.getClassName());
    var pp2 = new (function () {
        function _class(name) {
            _classCallCheck(this, _class);

            this.name = name;
        }

        _createClass(_class, [{
            key: "sayName",
            value: function sayName() {
                console.log(this.name);
            }
        }]);

        return _class;
    }())('pp2');
    pp2.sayName();

    var logger = function logger() {
        _classCallCheck(this, logger);
    };
    // classs中的严格模式


    var points = function points() {
        _classCallCheck(this, points);
    };

    console.log(points.name);

    var father = function () {
        function father(eye, nose, face) {
            _classCallCheck(this, father);

            this.eye = eye;
            this.nose = nose;
            this.face = face;
        }

        _createClass(father, [{
            key: "getPeople",
            value: function getPeople() {
                return this.eye + 'big,' + this.nose + 'small,' + this.face + 'beautiful.';
            }
        }]);

        return father;
    }();

    var sf = new father('blue', 'steck', 'white');
    console.log(sf.getPeople());

    var son = function (_father) {
        _inherits(son, _father);

        function son(eye, nose, face, sex) {
            _classCallCheck(this, son);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(son).call(this, eye, nose, face));

            _this.sex = sex;
            return _this;
        }

        _createClass(son, [{
            key: "getPeople",
            value: function getPeople() {
                return this.sex + ',' + _get(Object.getPrototypeOf(son.prototype), "getPeople", this).call(this);
            }
        }]);

        return son;
    }(father);

    var sfSon = new son('blue', 'steck', 'white', 'man');
    console.log(sfSon.getPeople());
    //关于es6 字符串的扩展
    //关于es6 正则表达式的扩展
    //关于es6 数值的扩展
    console.log(Number.isFinite(15));
    console.log(Number.isFinite(Infinity));
    console.log(Number.isFinite(5.5))
});