/**
 * Created by wb-sfzy189670 on 2016/11/23.
 */
define(function(require, exports, module){
    require("js/jquery-1.11.2.js");
   ;(function($, window, document, undefined){
        function NeedTip(ele,option){
            this.ele = ele;
            this.defaults = {
                'backgroundColor' : 'pink',
                'borderRadius' : '3000px',
                'content' : '我是内容',
                'location' : 'up' 
            };
            this.options = $.extend({},this.defaults,option);
        }
        NeedTip.prototype = {
            tipSon : $("<div class='need-tip-son'></div>"),
            init : function(){
                var me = this;
                me.getContent();
                me.render();
                me.tipSon.hide();
                me.getLocation();
                me.events();
            },
            render : function(){
                 var me = this;
                 var con = me.getContent();
                 console.log(con);
                 me.ele.append(me.tipSon.html(con));
            },
            getLocation : function(){
                var me = this;
                // console.log(me.options.location);
                return me.options.location;
            },
            getContent : function(){
                var me = this;
                // console.log(me.options.content);
                return me.options.content;
            },
            events : function(){
                var me = this;
                me.ele.on('mouseenter',function(){
                    me.tipSon.show();
                });
                me.ele.on('mouseleave',function(){
                    me.tipSon.hide();
                })
            }
        };
        $.fn.needTip = function(opts){
            var needTip = new NeedTip(this, opts);
            return needTip.init();
        };
    })(jQuery, window, document, undefined)
});