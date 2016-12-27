"use strict";
define("bus/generator-debug", [], function(require, module, exports) {
    function helloWorldGenerator() {
        return regeneratorRuntime.wrap(function(_context) {
            for (;;) switch (_context.prev = _context.next) {
                case 0:
                    return _context.next = 2, "hello";
                case 2:
                    return _context.next = 4, "world";
                case 4:
                    return _context.abrupt("return", "ending");
                case 5:
                case "end":
                    return _context.stop()
            }
        }, _marked[0], this)
    }
    var _marked = [helloWorldGenerator].map(regeneratorRuntime.mark);
    helloWorldGenerator()
});