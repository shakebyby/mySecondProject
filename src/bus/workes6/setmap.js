"use strict";

define(function (require, module, exports) {
    var s = new Set();
    [2, 3, 4, 5, 2, 2, 5, "2"].map(function (x) {
        return s.add(x);
    });
    console.log(s);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = s[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            console.log(i);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var items = new Set([1, 2, 3, 4, 5, 5, 5, 6, 6, 6, 6, 6]);
    console.log(items.size);
    var nans = new Set();
    [NaN, NaN, NaN].map(function (x) {
        return nans.add(x);
    });
    console.log(nans);
    var setObj = new Set();
    setObj.add({});
    console.log("ObjsetSize", setObj.size);
    setObj.add({});
    console.log("ObjsetSize", setObj.size);
    var setObjs = new Set();
    setObjs.add(NaN);
    setObjs.add(NaN);
    setObjs.add(NaN);
    console.log(setObjs);

    var a = new map();
    a.set(1, 11);
});