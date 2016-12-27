! function(factory) {
    "object" == typeof exports ? module.exports = factory(require("jquery-debug")) : "function" == typeof define && define.amd ? define("assets/jqueryKnob/jquery-debug.knob", ["jquery-debug"], factory) : factory(jQuery)
}(function($) {
    "use strict";
    var k = {},
        max = Math.max,
        min = Math.min;
    k.c = {}, k.c.d = $(document), k.c.t = function(e) {
        return e.originalEvent.touches.length - 1
    }, k.o = function() {
        var s = this;
        this.o = null, this.$ = null, this.i = null, this.g = null, this.v = null, this.cv = null, this.x = 0, this.y = 0, this.w = 0, this.h = 0, this.$c = null, this.c = null, this.t = 0, this.isInit = !1, this.fgColor = null, this.pColor = null, this.dH = null, this.cH = null, this.eH = null, this.rH = null, this.scale = 1, this.relative = !1, this.relativeWidth = !1, this.relativeHeight = !1, this.$div = null, this.run = function() {
            var cf = function(e, conf) {
                var k;
                for (k in conf) s.o[k] = conf[k];
                s._carve().init(), s._configure()._draw()
            };
            if (!this.$.data("kontroled")) {
                if (this.$.data("kontroled", !0), this.extend(), this.o = $.extend({
                        min: void 0 !== this.$.data("min") ? this.$.data("min") : 0,
                        max: void 0 !== this.$.data("max") ? this.$.data("max") : 100,
                        stopper: !0,
                        readOnly: this.$.data("readonly") || "readonly" === this.$.attr("readonly"),
                        cursor: this.$.data("cursor") === !0 && 30 || this.$.data("cursor") || 0,
                        thickness: this.$.data("thickness") && Math.max(Math.min(this.$.data("thickness"), 1), .01) || .35,
                        lineCap: this.$.data("linecap") || "butt",
                        width: this.$.data("width") || 200,
                        height: this.$.data("height") || 200,
                        displayInput: null == this.$.data("displayinput") || this.$.data("displayinput"),
                        displayPrevious: this.$.data("displayprevious"),
                        fgColor: this.$.data("fgcolor") || "#87CEEB",
                        inputColor: this.$.data("inputcolor"),
                        font: this.$.data("font") || "Arial",
                        fontWeight: this.$.data("font-weight") || "bold",
                        inline: !1,
                        step: this.$.data("step") || 1,
                        rotation: this.$.data("rotation"),
                        draw: null,
                        change: null,
                        cancel: null,
                        release: null,
                        format: function(v) {
                            return v
                        },
                        parse: function(v) {
                            return parseFloat(v)
                        }
                    }, this.o), this.o.flip = "anticlockwise" === this.o.rotation || "acw" === this.o.rotation, this.o.inputColor || (this.o.inputColor = this.o.fgColor), this.$.is("fieldset") ? (this.v = {}, this.i = this.$.find("input"), this.i.each(function(k) {
                        var $this = $(this);
                        s.i[k] = $this, s.v[k] = s.o.parse($this.val()), $this.bind("change blur", function() {
                            var val = {};
                            val[k] = $this.val(), s.val(s._validate(val))
                        })
                    }), this.$.find("legend").remove()) : (this.i = this.$, this.v = this.o.parse(this.$.val()), "" === this.v && (this.v = this.o.min), this.$.bind("change blur", function() {
                        s.val(s._validate(s.o.parse(s.$.val())))
                    })), !this.o.displayInput && this.$.hide(), this.$c = $(document.createElement("canvas")).attr({
                        width: this.o.width,
                        height: this.o.height
                    }), this.$div = $('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + 'px;"></div>'), this.$.wrap(this.$div).before(this.$c), this.$div = this.$.parent(), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.$c[0]), this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null, !this.c) throw {
                    name: "CanvasNotSupportedException",
                    message: "Canvas not supported. Please use excanvas on IE8.0.",
                    toString: function() {
                        return this.name + ": " + this.message
                    }
                };
                return this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1), this.relativeWidth = this.o.width % 1 !== 0 && this.o.width.indexOf("%"), this.relativeHeight = this.o.height % 1 !== 0 && this.o.height.indexOf("%"), this.relative = this.relativeWidth || this.relativeHeight, this._carve(), this.v instanceof Object ? (this.cv = {}, this.copy(this.v, this.cv)) : this.cv = this.v, this.$.bind("configure", cf).parent().bind("configure", cf), this._listen()._configure()._xy().init(), this.isInit = !0, this.$.val(this.o.format(this.v)), this._draw(), this
            }
        }, this._carve = function() {
            if (this.relative) {
                var w = this.relativeWidth ? this.$div.parent().width() * parseInt(this.o.width) / 100 : this.$div.parent().width(),
                    h = this.relativeHeight ? this.$div.parent().height() * parseInt(this.o.height) / 100 : this.$div.parent().height();
                this.w = this.h = Math.min(w, h)
            } else this.w = this.o.width, this.h = this.o.height;
            return this.$div.css({
                width: this.w + "px",
                height: this.h + "px"
            }), this.$c.attr({
                width: this.w,
                height: this.h
            }), 1 !== this.scale && (this.$c[0].width = this.$c[0].width * this.scale, this.$c[0].height = this.$c[0].height * this.scale, this.$c.width(this.w), this.$c.height(this.h)), this
        }, this._draw = function() {
            var d = !0;
            s.g = s.c, s.clear(), s.dH && (d = s.dH()), d !== !1 && s.draw()
        }, this._touch = function(e) {
            var touchMove = function(e) {
                var v = s.xy2val(e.originalEvent.touches[s.t].pageX, e.originalEvent.touches[s.t].pageY);
                v != s.cv && (s.cH && s.cH(v) === !1 || (s.change(s._validate(v)), s._draw()))
            };
            return this.t = k.c.t(e), touchMove(e), k.c.d.bind("touchmove.k", touchMove).bind("touchend.k", function() {
                k.c.d.unbind("touchmove.k touchend.k"), s.val(s.cv)
            }), this
        }, this._mouse = function(e) {
            var mouseMove = function(e) {
                var v = s.xy2val(e.pageX, e.pageY);
                v != s.cv && (s.cH && s.cH(v) === !1 || (s.change(s._validate(v)), s._draw()))
            };
            return mouseMove(e), k.c.d.bind("mousemove.k", mouseMove).bind("keyup.k", function(e) {
                if (27 === e.keyCode) {
                    if (k.c.d.unbind("mouseup.k mousemove.k keyup.k"), s.eH && s.eH() === !1) return;
                    s.cancel()
                }
            }).bind("mouseup.k", function(e) {
                k.c.d.unbind("mousemove.k mouseup.k keyup.k"), s.val(s.cv)
            }), this
        }, this._xy = function() {
            var o = this.$c.offset();
            return this.x = o.left, this.y = o.top, this
        }, this._listen = function() {
            return this.o.readOnly ? this.$.attr("readonly", "readonly") : (this.$c.bind("mousedown", function(e) {
                e.preventDefault(), s._xy()._mouse(e)
            }).bind("touchstart", function(e) {
                e.preventDefault(), s._xy()._touch(e)
            }), this.listen()), this.relative && $(window).resize(function() {
                s._carve().init(), s._draw()
            }), this
        }, this._configure = function() {
            return this.o.draw && (this.dH = this.o.draw), this.o.change && (this.cH = this.o.change), this.o.cancel && (this.eH = this.o.cancel), this.o.release && (this.rH = this.o.release), this.o.displayPrevious ? (this.pColor = this.h2rgba(this.o.fgColor, "0.4"), this.fgColor = this.h2rgba(this.o.fgColor, "0.6")) : this.fgColor = this.o.fgColor, this
        }, this._clear = function() {
            this.$c[0].width = this.$c[0].width
        }, this._validate = function(v) {
            var val = ~~((v < 0 ? -.5 : .5) + v / this.o.step) * this.o.step;
            return Math.round(100 * val) / 100
        }, this.listen = function() {}, this.extend = function() {}, this.init = function() {}, this.change = function(v) {}, this.val = function(v) {}, this.xy2val = function(x, y) {}, this.draw = function() {}, this.clear = function() {
            this._clear()
        }, this.h2rgba = function(h, a) {
            var rgb;
            return h = h.substring(1, 7), rgb = [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)], "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")"
        }, this.copy = function(f, t) {
            for (var i in f) t[i] = f[i]
        }
    }, k.Dial = function() {
        k.o.call(this), this.startAngle = null, this.xy = null, this.radius = null, this.lineWidth = null, this.cursorExt = null, this.w2 = null, this.PI2 = 2 * Math.PI, this.extend = function() {
            this.o = $.extend({
                bgColor: this.$.data("bgcolor") || "#EEEEEE",
                angleOffset: this.$.data("angleoffset") || 0,
                angleArc: this.$.data("anglearc") || 360,
                inline: !0
            }, this.o)
        }, this.val = function(v, triggerRelease) {
            return null == v ? this.v : (v = this.o.parse(v), void(triggerRelease !== !1 && v != this.v && this.rH && this.rH(v) === !1 || (this.cv = this.o.stopper ? max(min(v, this.o.max), this.o.min) : v, this.v = this.cv, this.$.val(this.o.format(this.v)), this._draw())))
        }, this.xy2val = function(x, y) {
            var a, ret;
            return a = Math.atan2(x - (this.x + this.w2), -(y - this.y - this.w2)) - this.angleOffset, this.o.flip && (a = this.angleArc - a - this.PI2), this.angleArc != this.PI2 && a < 0 && a > -.5 ? a = 0 : a < 0 && (a += this.PI2), ret = a * (this.o.max - this.o.min) / this.angleArc + this.o.min, this.o.stopper && (ret = max(min(ret, this.o.max), this.o.min)), ret
        }, this.listen = function() {
            var mwTimerStop, mwTimerRelease, kval, to, s = this,
                mw = function(e) {
                    e.preventDefault();
                    var ori = e.originalEvent,
                        deltaX = ori.detail || ori.wheelDeltaX,
                        deltaY = ori.detail || ori.wheelDeltaY,
                        v = s._validate(s.o.parse(s.$.val())) + (deltaX > 0 || deltaY > 0 ? s.o.step : deltaX < 0 || deltaY < 0 ? -s.o.step : 0);
                    v = max(min(v, s.o.max), s.o.min), s.val(v, !1), s.rH && (clearTimeout(mwTimerStop), mwTimerStop = setTimeout(function() {
                        s.rH(v), mwTimerStop = null
                    }, 100), mwTimerRelease || (mwTimerRelease = setTimeout(function() {
                        mwTimerStop && s.rH(v), mwTimerRelease = null
                    }, 200)))
                },
                m = 1,
                kv = {
                    37: -s.o.step,
                    38: s.o.step,
                    39: s.o.step,
                    40: -s.o.step
                };
            this.$.bind("keydown", function(e) {
                var kc = e.keyCode;
                if (kc >= 96 && kc <= 105 && (kc = e.keyCode = kc - 48), kval = parseInt(String.fromCharCode(kc)), isNaN(kval) && (13 !== kc && 8 !== kc && 9 !== kc && 189 !== kc && (190 !== kc || s.$.val().match(/\./)) && e.preventDefault(), $.inArray(kc, [37, 38, 39, 40]) > -1)) {
                    e.preventDefault();
                    var v = s.o.parse(s.$.val()) + kv[kc] * m;
                    s.o.stopper && (v = max(min(v, s.o.max), s.o.min)), s.change(s._validate(v)), s._draw(), to = window.setTimeout(function() {
                        m *= 2
                    }, 30)
                }
            }).bind("keyup", function(e) {
                isNaN(kval) ? to && (window.clearTimeout(to), to = null, m = 1, s.val(s.$.val())) : s.$.val() > s.o.max && s.$.val(s.o.max) || s.$.val() < s.o.min && s.$.val(s.o.min)
            }), this.$c.bind("mousewheel DOMMouseScroll", mw), this.$.bind("mousewheel DOMMouseScroll", mw)
        }, this.init = function() {
            (this.v < this.o.min || this.v > this.o.max) && (this.v = this.o.min), this.$.val(this.v), this.w2 = this.w / 2, this.cursorExt = this.o.cursor / 100, this.xy = this.w2 * this.scale, this.lineWidth = this.xy * this.o.thickness, this.lineCap = this.o.lineCap, this.radius = this.xy - this.lineWidth / 2, this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset), this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc), this.angleOffset = this.o.angleOffset * Math.PI / 180, this.angleArc = this.o.angleArc * Math.PI / 180, this.startAngle = 1.5 * Math.PI + this.angleOffset, this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
            var s = max(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
            this.o.displayInput && this.i.css({
                width: (this.w / 2 + 4 >> 0) + "px",
                height: (this.w / 3 >> 0) + "px",
                position: "absolute",
                "vertical-align": "middle",
                "margin-top": (this.w / 3 >> 0) + "px",
                "margin-left": "-" + (3 * this.w / 4 + 2 >> 0) + "px",
                border: 0,
                background: "none",
                font: this.o.fontWeight + " " + (this.w / s >> 0) + "px " + this.o.font,
                "text-align": "center",
                color: this.o.inputColor || this.o.fgColor,
                padding: "0px",
                "-webkit-appearance": "none"
            }) || this.i.css({
                width: "0px",
                visibility: "hidden"
            })
        }, this.change = function(v) {
            this.cv = v, this.$.val(this.o.format(v))
        }, this.angle = function(v) {
            return (v - this.o.min) * this.angleArc / (this.o.max - this.o.min)
        }, this.arc = function(v) {
            var sa, ea;
            return v = this.angle(v), this.o.flip ? (sa = this.endAngle + 1e-5, ea = sa - v - 1e-5) : (sa = this.startAngle - 1e-5, ea = sa + v + 1e-5), this.o.cursor && (sa = ea - this.cursorExt) && (ea += this.cursorExt), {
                s: sa,
                e: ea,
                d: this.o.flip && !this.o.cursor
            }
        }, this.draw = function() {
            var pa, c = this.g,
                a = this.arc(this.cv),
                r = 1;
            c.lineWidth = this.lineWidth, c.lineCap = this.lineCap, "none" !== this.o.bgColor && (c.beginPath(), c.strokeStyle = this.o.bgColor, c.arc(this.xy, this.xy, this.radius, this.endAngle - 1e-5, this.startAngle + 1e-5, !0), c.stroke()), this.o.displayPrevious && (pa = this.arc(this.v), c.beginPath(), c.strokeStyle = this.pColor, c.arc(this.xy, this.xy, this.radius, pa.s, pa.e, pa.d), c.stroke(), r = this.cv == this.v), c.beginPath(), c.strokeStyle = r ? this.o.fgColor : this.fgColor, c.arc(this.xy, this.xy, this.radius, a.s, a.e, a.d), c.stroke()
        }, this.cancel = function() {
            this.val(this.v)
        }
    }, $.fn.dial = $.fn.knob = function(o) {
        return this.each(function() {
            var d = new k.Dial;
            d.o = o, d.$ = $(this), d.run()
        }).parent()
    }
});