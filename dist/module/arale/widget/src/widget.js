define(function(e,t,n){function i(){return"widget-"+w++}function s(e){return"[object String]"===R.call(e)}function r(e){return"[object Function]"===R.call(e)}function l(e){return x(document.documentElement,e)}function o(e){return e.charAt(0).toUpperCase()+e.substring(1)}function a(e){return r(e.events)&&(e.events=e.events()),e.events}function u(e,t){var n=e.match(C),i=n[1]+g+t.cid,s=n[2]||void 0;return s&&s.indexOf("{{")>-1&&(s=h(s,t)),{type:i,selector:s}}function h(e,t){return e.replace(O,function(e,n){for(var i,r=n.split("."),l=t;i=r.shift();)l=l===t.attrs?t.get(i):l[i];return s(l)?l:T})}function d(e){return null==e||void 0===e}function c(e){for(var t=e.length-1;t>=0&&void 0===e[t];t--)e.pop();return e}var m=e("arale-base"),f=e("jquery"),p=e("./daparser"),v=e("./auto-render"),g=".delegate-events-",E="_onRender",_="data-widget-cid",y={},A=m.extend({propsInAttrs:["initElement","element","events"],element:null,events:null,attrs:{id:null,className:null,style:null,template:"<div></div>",model:null,parentNode:document.body},initialize:function(e){this.cid=i();var t=this._parseDataAttrsConfig(e);A.superclass.initialize.call(this,e?f.extend(t,e):t),this.parseElement(),this.initProps(),this.delegateEvents(),this.setup(),this._stamp(),this._isTemplate=!(e&&e.element)},_parseDataAttrsConfig:function(e){var t,n;return e&&(t=f(e.initElement?e.initElement:e.element)),t&&t[0]&&!v.isDataApiOff(t)&&(n=p.parseElement(t)),n},parseElement:function(){var e=this.element;if(e?this.element=f(e):this.get("template")&&this.parseElementFromTemplate(),!this.element||!this.element[0])throw new Error("element is invalid")},parseElementFromTemplate:function(){this.element=f(this.get("template"))},initProps:function(){},delegateEvents:function(e,t,n){var i=c(Array.prototype.slice.call(arguments));if(0===i.length?(t=a(this),e=this.element):1===i.length?(t=e,e=this.element):2===i.length?(n=t,t=e,e=this.element):(e||(e=this.element),this._delegateElements||(this._delegateElements=[]),this._delegateElements.push(f(e))),s(t)&&r(n)){var l={};l[t]=n,t=l}for(var o in t)if(t.hasOwnProperty(o)){var h=u(o,this),d=h.type,m=h.selector;!function(t,n){var i=function(e){r(t)?t.call(n,e):n[t](e)};m?f(e).on(d,m,i):f(e).on(d,i)}(t[o],this)}return this},undelegateEvents:function(e,t){var n=c(Array.prototype.slice.call(arguments));if(t||(t=e,e=null),0===n.length){var i=g+this.cid;if(this.element&&this.element.off(i),this._delegateElements)for(var s in this._delegateElements)this._delegateElements.hasOwnProperty(s)&&this._delegateElements[s].off(i)}else{var r=u(t,this);e?f(e).off(r.type,r.selector):this.element&&this.element.off(r.type,r.selector)}return this},setup:function(){},render:function(){this.rendered||(this._renderAndBindAttrs(),this.rendered=!0);var e=this.get("parentNode");if(e&&!l(this.element[0])){var t=this.constructor.outerBoxClass;if(t){var n=this._outerBox=f("<div></div>").addClass(t);n.append(this.element).appendTo(e)}else this.element.appendTo(e)}return this},_renderAndBindAttrs:function(){var e=this,t=e.attrs;for(var n in t)if(t.hasOwnProperty(n)){var i=E+o(n);if(this[i]){var s=this.get(n);d(s)||this[i](s,void 0,n),function(t){e.on("change:"+n,function(n,i,s){e[t](n,i,s)})}(i)}}},_onRenderId:function(e){this.element.attr("id",e)},_onRenderClassName:function(e){this.element.addClass(e)},_onRenderStyle:function(e){this.element.css(e)},_stamp:function(){var e=this.cid;(this.initElement||this.element).attr(_,e),y[e]=this},$:function(e){return this.element.find(e)},destroy:function(){this.undelegateEvents(),delete y[this.cid],this.element&&this._isTemplate&&(this.element.off(),this._outerBox?this._outerBox.remove():this.element.remove()),this.element=null,A.superclass.destroy.call(this)}});f(window).unload(function(){for(var e in y)y[e].destroy()}),A.query=function(e){var t,n=f(e).eq(0);return n&&(t=n.attr(_)),y[t]},A.autoRender=v.autoRender,A.autoRenderAll=v.autoRenderAll,A.StaticsWhiteList=["autoRender"],n.exports=A;var R=Object.prototype.toString,w=0,x=f.contains||function(e,t){return!!(16&e.compareDocumentPosition(t))},C=/^(\S+)\s*(.*)$/,O=/{{([^}]+)}}/g,T="INVALID_SELECTOR"});