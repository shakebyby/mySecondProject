"use strict";
define("bus/promise-debug", ["js/jQuery-debug"], function(require, module, exports) {
    function timeout(ms) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, ms, "done")
        })
    }
    require("js/jQuery-debug");
    timeout(100).then(function(value) {});
    var promiseOne = new Promise(function(resolve, reject) {
        var blone = !1;
        blone ? resolve("true") : reject("false")
    });
    promiseOne.then(function(resolve) {}, function(reject) {});
    var p1 = new Promise(function(resolve, reject) {
            var game = !1;
            game ? resolve("good") : reject("bad")
        }),
        p2 = new Promise(function(resolve, reject) {
            resolve(p1), reject(p1)
        });
    p2.then(function(value) {}, function(error) {});
    var p3 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                return reject(new Error("fail"))
            }, 3e3)
        }),
        p4 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                return resolve(p3)
            }, 1e3)
        });
    p4.then(function(result) {})["catch"](function(error) {});
    var p5 = new Promise(function(resolve, reject) {
        throw new Error("我不是错误")
    });
    p5.then(function(value) {})["catch"](function(error) {});
    var pAll01 = (new Promise(function(resolve, reject) {
            resolve(), reject()
        }), new Promise(function(resolve, reject) {
            resolve(function() {})
        })),
        pAll02 = new Promise(function(resolve, reject) {
            resolve({
                name: "tom"
            })
        }),
        pAll03 = new Promise(function(resolve, reject) {
            resolve([1, 2, 3])
        });
    Promise.all([pAll01, pAll02, pAll03]).then(function(value) {})["catch"](function(error) {})
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});