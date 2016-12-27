! function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("js/handlebars.runtime-v4.0-debug.5", [], factory) : "object" == typeof exports ? exports.Handlebars = factory() : root.Handlebars = factory()
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: !1
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "", __webpack_require__(0)
    }([function(module, exports, __webpack_require__) {
        "use strict";

        function create() {
            var hb = new base.HandlebarsEnvironment;
            return Utils.extend(hb, base), hb.SafeString = _handlebarsSafeString2["default"], hb.Exception = _handlebarsException2["default"], hb.Utils = Utils, hb.escapeExpression = Utils.escapeExpression, hb.VM = runtime, hb.template = function(spec) {
                return runtime.template(spec, hb)
            }, hb
        }
        var _interopRequireWildcard = __webpack_require__(1)["default"],
            _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0;
        var _handlebarsBase = __webpack_require__(3),
            base = _interopRequireWildcard(_handlebarsBase),
            _handlebarsSafeString = __webpack_require__(17),
            _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString),
            _handlebarsException = __webpack_require__(5),
            _handlebarsException2 = _interopRequireDefault(_handlebarsException),
            _handlebarsUtils = __webpack_require__(4),
            Utils = _interopRequireWildcard(_handlebarsUtils),
            _handlebarsRuntime = __webpack_require__(18),
            runtime = _interopRequireWildcard(_handlebarsRuntime),
            _handlebarsNoConflict = __webpack_require__(19),
            _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict),
            inst = create();
        inst.create = create, _handlebarsNoConflict2["default"](inst), inst["default"] = inst, exports["default"] = inst, module.exports = exports["default"]
    }, function(module, exports) {
        "use strict";
        exports["default"] = function(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj)
                for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj["default"] = obj, newObj
        }, exports.__esModule = !0
    }, function(module, exports) {
        "use strict";
        exports["default"] = function(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }, exports.__esModule = !0
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function HandlebarsEnvironment(helpers, partials, decorators) {
            this.helpers = helpers || {}, this.partials = partials || {}, this.decorators = decorators || {}, _helpers.registerDefaultHelpers(this), _decorators.registerDefaultDecorators(this)
        }
        var _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0, exports.HandlebarsEnvironment = HandlebarsEnvironment;
        var _utils = __webpack_require__(4),
            _exception = __webpack_require__(5),
            _exception2 = _interopRequireDefault(_exception),
            _helpers = __webpack_require__(6),
            _decorators = __webpack_require__(14),
            _logger = __webpack_require__(16),
            _logger2 = _interopRequireDefault(_logger),
            VERSION = "4.0.5";
        exports.VERSION = VERSION;
        var COMPILER_REVISION = 7;
        exports.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        exports.REVISION_CHANGES = REVISION_CHANGES;
        var objectType = "[object Object]";
        HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,
            logger: _logger2["default"],
            log: _logger2["default"].log,
            registerHelper: function(name, fn) {
                if (_utils.toString.call(name) === objectType) {
                    if (fn) throw new _exception2["default"]("Arg not supported with multiple helpers");
                    _utils.extend(this.helpers, name)
                } else this.helpers[name] = fn
            },
            unregisterHelper: function(name) {
                delete this.helpers[name]
            },
            registerPartial: function(name, partial) {
                if (_utils.toString.call(name) === objectType) _utils.extend(this.partials, name);
                else {
                    if ("undefined" == typeof partial) throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
                    this.partials[name] = partial
                }
            },
            unregisterPartial: function(name) {
                delete this.partials[name]
            },
            registerDecorator: function(name, fn) {
                if (_utils.toString.call(name) === objectType) {
                    if (fn) throw new _exception2["default"]("Arg not supported with multiple decorators");
                    _utils.extend(this.decorators, name)
                } else this.decorators[name] = fn
            },
            unregisterDecorator: function(name) {
                delete this.decorators[name]
            }
        };
        var log = _logger2["default"].log;
        exports.log = log, exports.createFrame = _utils.createFrame, exports.logger = _logger2["default"]
    }, function(module, exports) {
        "use strict";

        function escapeChar(chr) {
            return escape[chr]
        }

        function extend(obj) {
            for (var i = 1; i < arguments.length; i++)
                for (var key in arguments[i]) Object.prototype.hasOwnProperty.call(arguments[i], key) && (obj[key] = arguments[i][key]);
            return obj
        }

        function indexOf(array, value) {
            for (var i = 0, len = array.length; i < len; i++)
                if (array[i] === value) return i;
            return -1
        }

        function escapeExpression(string) {
            if ("string" != typeof string) {
                if (string && string.toHTML) return string.toHTML();
                if (null == string) return "";
                if (!string) return string + "";
                string = "" + string
            }
            return possible.test(string) ? string.replace(badChars, escapeChar) : string
        }

        function isEmpty(value) {
            return !value && 0 !== value || !(!isArray(value) || 0 !== value.length)
        }

        function createFrame(object) {
            var frame = extend({}, object);
            return frame._parent = object, frame
        }

        function blockParams(params, ids) {
            return params.path = ids, params
        }

        function appendContextPath(contextPath, id) {
            return (contextPath ? contextPath + "." : "") + id
        }
        exports.__esModule = !0, exports.extend = extend, exports.indexOf = indexOf, exports.escapeExpression = escapeExpression, exports.isEmpty = isEmpty, exports.createFrame = createFrame, exports.blockParams = blockParams, exports.appendContextPath = appendContextPath;
        var escape = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;",
                "=": "&#x3D;"
            },
            badChars = /[&<>"'`=]/g,
            possible = /[&<>"'`=]/,
            toString = Object.prototype.toString;
        exports.toString = toString;
        var isFunction = function(value) {
            return "function" == typeof value
        };
        isFunction(/x/) && (exports.isFunction = isFunction = function(value) {
            return "function" == typeof value && "[object Function]" === toString.call(value)
        }), exports.isFunction = isFunction;
        var isArray = Array.isArray || function(value) {
            return !(!value || "object" != typeof value) && "[object Array]" === toString.call(value)
        };
        exports.isArray = isArray
    }, function(module, exports) {
        "use strict";

        function Exception(message, node) {
            var loc = node && node.loc,
                line = void 0,
                column = void 0;
            loc && (line = loc.start.line, column = loc.start.column, message += " - " + line + ":" + column);
            for (var tmp = Error.prototype.constructor.call(this, message), idx = 0; idx < errorProps.length; idx++) this[errorProps[idx]] = tmp[errorProps[idx]];
            Error.captureStackTrace && Error.captureStackTrace(this, Exception), loc && (this.lineNumber = line, this.column = column)
        }
        exports.__esModule = !0;
        var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        Exception.prototype = new Error, exports["default"] = Exception, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function registerDefaultHelpers(instance) {
            _helpersBlockHelperMissing2["default"](instance), _helpersEach2["default"](instance), _helpersHelperMissing2["default"](instance), _helpersIf2["default"](instance), _helpersLog2["default"](instance), _helpersLookup2["default"](instance), _helpersWith2["default"](instance)
        }
        var _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0, exports.registerDefaultHelpers = registerDefaultHelpers;
        var _helpersBlockHelperMissing = __webpack_require__(7),
            _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing),
            _helpersEach = __webpack_require__(8),
            _helpersEach2 = _interopRequireDefault(_helpersEach),
            _helpersHelperMissing = __webpack_require__(9),
            _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing),
            _helpersIf = __webpack_require__(10),
            _helpersIf2 = _interopRequireDefault(_helpersIf),
            _helpersLog = __webpack_require__(11),
            _helpersLog2 = _interopRequireDefault(_helpersLog),
            _helpersLookup = __webpack_require__(12),
            _helpersLookup2 = _interopRequireDefault(_helpersLookup),
            _helpersWith = __webpack_require__(13),
            _helpersWith2 = _interopRequireDefault(_helpersWith)
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _utils = __webpack_require__(4);
        exports["default"] = function(instance) {
            instance.registerHelper("blockHelperMissing", function(context, options) {
                var inverse = options.inverse,
                    fn = options.fn;
                if (context === !0) return fn(this);
                if (context === !1 || null == context) return inverse(this);
                if (_utils.isArray(context)) return context.length > 0 ? (options.ids && (options.ids = [options.name]), instance.helpers.each(context, options)) : inverse(this);
                if (options.data && options.ids) {
                    var data = _utils.createFrame(options.data);
                    data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name), options = {
                        data: data
                    }
                }
                return fn(context, options)
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0;
        var _utils = __webpack_require__(4),
            _exception = __webpack_require__(5),
            _exception2 = _interopRequireDefault(_exception);
        exports["default"] = function(instance) {
            instance.registerHelper("each", function(context, options) {
                function execIteration(field, index, last) {
                    data && (data.key = field, data.index = index, data.first = 0 === index, data.last = !!last, contextPath && (data.contextPath = contextPath + field)), ret += fn(context[field], {
                        data: data,
                        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
                    })
                }
                if (!options) throw new _exception2["default"]("Must pass iterator to #each");
                var fn = options.fn,
                    inverse = options.inverse,
                    i = 0,
                    ret = "",
                    data = void 0,
                    contextPath = void 0;
                if (options.data && options.ids && (contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + "."), _utils.isFunction(context) && (context = context.call(this)), options.data && (data = _utils.createFrame(options.data)), context && "object" == typeof context)
                    if (_utils.isArray(context))
                        for (var j = context.length; i < j; i++) i in context && execIteration(i, i, i === context.length - 1);
                    else {
                        var priorKey = void 0;
                        for (var key in context) context.hasOwnProperty(key) && (void 0 !== priorKey && execIteration(priorKey, i - 1), priorKey = key, i++);
                        void 0 !== priorKey && execIteration(priorKey, i - 1, !0)
                    }
                return 0 === i && (ret = inverse(this)), ret
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0;
        var _exception = __webpack_require__(5),
            _exception2 = _interopRequireDefault(_exception);
        exports["default"] = function(instance) {
            instance.registerHelper("helperMissing", function() {
                if (1 !== arguments.length) throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _utils = __webpack_require__(4);
        exports["default"] = function(instance) {
            instance.registerHelper("if", function(conditional, options) {
                return _utils.isFunction(conditional) && (conditional = conditional.call(this)), !options.hash.includeZero && !conditional || _utils.isEmpty(conditional) ? options.inverse(this) : options.fn(this)
            }), instance.registerHelper("unless", function(conditional, options) {
                return instance.helpers["if"].call(this, conditional, {
                    fn: options.inverse,
                    inverse: options.fn,
                    hash: options.hash
                })
            })
        }, module.exports = exports["default"]
    }, function(module, exports) {
        "use strict";
        exports.__esModule = !0, exports["default"] = function(instance) {
            instance.registerHelper("log", function() {
                for (var args = [void 0], options = arguments[arguments.length - 1], i = 0; i < arguments.length - 1; i++) args.push(arguments[i]);
                var level = 1;
                null != options.hash.level ? level = options.hash.level : options.data && null != options.data.level && (level = options.data.level), args[0] = level, instance.log.apply(instance, args)
            })
        }, module.exports = exports["default"]
    }, function(module, exports) {
        "use strict";
        exports.__esModule = !0, exports["default"] = function(instance) {
            instance.registerHelper("lookup", function(obj, field) {
                return obj && obj[field]
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _utils = __webpack_require__(4);
        exports["default"] = function(instance) {
            instance.registerHelper("with", function(context, options) {
                _utils.isFunction(context) && (context = context.call(this));
                var fn = options.fn;
                if (_utils.isEmpty(context)) return options.inverse(this);
                var data = options.data;
                return options.data && options.ids && (data = _utils.createFrame(options.data), data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0])), fn(context, {
                    data: data,
                    blockParams: _utils.blockParams([context], [data && data.contextPath])
                })
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function registerDefaultDecorators(instance) {
            _decoratorsInline2["default"](instance)
        }
        var _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0, exports.registerDefaultDecorators = registerDefaultDecorators;
        var _decoratorsInline = __webpack_require__(15),
            _decoratorsInline2 = _interopRequireDefault(_decoratorsInline)
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _utils = __webpack_require__(4);
        exports["default"] = function(instance) {
            instance.registerDecorator("inline", function(fn, props, container, options) {
                var ret = fn;
                return props.partials || (props.partials = {}, ret = function(context, options) {
                    var original = container.partials;
                    container.partials = _utils.extend({}, original, props.partials);
                    var ret = fn(context, options);
                    return container.partials = original, ret
                }), props.partials[options.args[0]] = options.fn, ret
            })
        }, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0;
        var _utils = __webpack_require__(4),
            logger = {
                methodMap: ["debug", "info", "warn", "error"],
                level: "info",
                lookupLevel: function(level) {
                    if ("string" == typeof level) {
                        var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
                        level = levelMap >= 0 ? levelMap : parseInt(level, 10)
                    }
                    return level
                },
                log: function(level) {
                    if (level = logger.lookupLevel(level), "undefined" != typeof console && logger.lookupLevel(logger.level) <= level) {
                        var method = logger.methodMap[level];
                        console[method] || (method = "log");
                        for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) message[_key - 1] = arguments[_key]
                    }
                }
            };
        exports["default"] = logger, module.exports = exports["default"]
    }, function(module, exports) {
        "use strict";

        function SafeString(string) {
            this.string = string
        }
        exports.__esModule = !0, SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
            return "" + this.string
        }, exports["default"] = SafeString, module.exports = exports["default"]
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function checkRevision(compilerInfo) {
            var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                currentRevision = _base.COMPILER_REVISION;
            if (compilerRevision !== currentRevision) {
                if (compilerRevision < currentRevision) {
                    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
                        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
                    throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").")
                }
                throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").")
            }
        }

        function template(templateSpec, env) {
            function invokePartialWrapper(partial, context, options) {
                options.hash && (context = Utils.extend({}, context, options.hash), options.ids && (options.ids[0] = !0)), partial = env.VM.resolvePartial.call(this, partial, context, options);
                var result = env.VM.invokePartial.call(this, partial, context, options);
                if (null == result && env.compile && (options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env), result = options.partials[options.name](context, options)), null != result) {
                    if (options.indent) {
                        for (var lines = result.split("\n"), i = 0, l = lines.length; i < l && (lines[i] || i + 1 !== l); i++) lines[i] = options.indent + lines[i];
                        result = lines.join("\n")
                    }
                    return result
                }
                throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode")
            }

            function ret(context) {
                function main(context) {
                    return "" + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths)
                }
                var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    data = options.data;
                ret._setup(options), !options.partial && templateSpec.useData && (data = initData(context, data));
                var depths = void 0,
                    blockParams = templateSpec.useBlockParams ? [] : void 0;
                return templateSpec.useDepths && (depths = options.depths ? context !== options.depths[0] ? [context].concat(options.depths) : options.depths : [context]), (main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams))(context, options)
            }
            if (!env) throw new _exception2["default"]("No environment passed to template");
            if (!templateSpec || !templateSpec.main) throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
            templateSpec.main.decorator = templateSpec.main_d, env.VM.checkRevision(templateSpec.compiler);
            var container = {
                strict: function(obj, name) {
                    if (!(name in obj)) throw new _exception2["default"]('"' + name + '" not defined in ' + obj);
                    return obj[name]
                },
                lookup: function(depths, name) {
                    for (var len = depths.length, i = 0; i < len; i++)
                        if (depths[i] && null != depths[i][name]) return depths[i][name]
                },
                lambda: function(current, context) {
                    return "function" == typeof current ? current.call(context) : current
                },
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                fn: function(i) {
                    var ret = templateSpec[i];
                    return ret.decorator = templateSpec[i + "_d"], ret
                },
                programs: [],
                program: function(i, data, declaredBlockParams, blockParams, depths) {
                    var programWrapper = this.programs[i],
                        fn = this.fn(i);
                    return data || depths || blockParams || declaredBlockParams ? programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths) : programWrapper || (programWrapper = this.programs[i] = wrapProgram(this, i, fn)), programWrapper
                },
                data: function(value, depth) {
                    for (; value && depth--;) value = value._parent;
                    return value
                },
                merge: function(param, common) {
                    var obj = param || common;
                    return param && common && param !== common && (obj = Utils.extend({}, common, param)), obj
                },
                noop: env.VM.noop,
                compilerInfo: templateSpec.compiler
            };
            return ret.isTop = !0, ret._setup = function(options) {
                options.partial ? (container.helpers = options.helpers, container.partials = options.partials, container.decorators = options.decorators) : (container.helpers = container.merge(options.helpers, env.helpers), templateSpec.usePartial && (container.partials = container.merge(options.partials, env.partials)), (templateSpec.usePartial || templateSpec.useDecorators) && (container.decorators = container.merge(options.decorators, env.decorators)))
            }, ret._child = function(i, data, blockParams, depths) {
                if (templateSpec.useBlockParams && !blockParams) throw new _exception2["default"]("must pass block params");
                if (templateSpec.useDepths && !depths) throw new _exception2["default"]("must pass parent depths");
                return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths)
            }, ret
        }

        function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
            function prog(context) {
                var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    currentDepths = depths;
                return depths && context !== depths[0] && (currentDepths = [context].concat(depths)), fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths)
            }
            return prog = executeDecorators(fn, prog, container, depths, data, blockParams), prog.program = i, prog.depth = depths ? depths.length : 0, prog.blockParams = declaredBlockParams || 0, prog
        }

        function resolvePartial(partial, context, options) {
            return partial ? partial.call || options.name || (options.name = partial, partial = options.partials[partial]) : partial = "@partial-block" === options.name ? options.data["partial-block"] : options.partials[options.name], partial
        }

        function invokePartial(partial, context, options) {
            options.partial = !0, options.ids && (options.data.contextPath = options.ids[0] || options.data.contextPath);
            var partialBlock = void 0;
            if (options.fn && options.fn !== noop && (options.data = _base.createFrame(options.data), partialBlock = options.data["partial-block"] = options.fn, partialBlock.partials && (options.partials = Utils.extend({}, options.partials, partialBlock.partials))), void 0 === partial && partialBlock && (partial = partialBlock), void 0 === partial) throw new _exception2["default"]("The partial " + options.name + " could not be found");
            if (partial instanceof Function) return partial(context, options)
        }

        function noop() {
            return ""
        }

        function initData(context, data) {
            return data && "root" in data || (data = data ? _base.createFrame(data) : {}, data.root = context), data
        }

        function executeDecorators(fn, prog, container, depths, data, blockParams) {
            if (fn.decorator) {
                var props = {};
                prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths), Utils.extend(prog, props)
            }
            return prog
        }
        var _interopRequireWildcard = __webpack_require__(1)["default"],
            _interopRequireDefault = __webpack_require__(2)["default"];
        exports.__esModule = !0, exports.checkRevision = checkRevision, exports.template = template, exports.wrapProgram = wrapProgram, exports.resolvePartial = resolvePartial, exports.invokePartial = invokePartial, exports.noop = noop;
        var _utils = __webpack_require__(4),
            Utils = _interopRequireWildcard(_utils),
            _exception = __webpack_require__(5),
            _exception2 = _interopRequireDefault(_exception),
            _base = __webpack_require__(3)
    }, function(module, exports) {
        (function(global) {
            "use strict";
            exports.__esModule = !0, exports["default"] = function(Handlebars) {
                var root = "undefined" != typeof global ? global : window,
                    $Handlebars = root.Handlebars;
                Handlebars.noConflict = function() {
                    return root.Handlebars === Handlebars && (root.Handlebars = $Handlebars), Handlebars
                }
            }, module.exports = exports["default"]
        }).call(exports, function() {
            return this
        }())
    }])
});