"use strict";
define("bus/workes6/setmap-debug", [], function(require, module, exports) {
    var s = new Set;
    [2, 3, 4, 5, 2, 2, 5, "2"].map(function(x) {
        return s.add(x)
    });
    var _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
    try {
        for (var _step, _iterator = s[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
            _step.value
        }
    } catch (err) {
        _didIteratorError = !0, _iteratorError = err
    } finally {
        try {
            !_iteratorNormalCompletion && _iterator["return"] && _iterator["return"]()
        } finally {
            if (_didIteratorError) throw _iteratorError
        }
    }
    var nans = (new Set([1, 2, 3, 4, 5, 5, 5, 6, 6, 6, 6, 6]), new Set);
    [NaN, NaN, NaN].map(function(x) {
        return nans.add(x)
    });
    var setObj = new Set;
    setObj.add({}), setObj.add({});
    var setObjs = new Set;
    setObjs.add(NaN), setObjs.add(NaN), setObjs.add(NaN);
    var a = new map;
    a.set(1, 11)
});