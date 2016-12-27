/**
 * Created by wb-sfzy189670 on 2016/11/15.
 */
define(function(require, exports, module){
    var $ = require('jQuery');
    require('knob');
    var dial = $(".dial").knob({
        width:100,//宽度
        height:100,
        thickness:0.1,//厚度按百分几计算
        fgColor:'rgb(200,0,0)',//前景色
        displayInput:false,//不显示input
        //bgColor:'#000',//背景色
        readOnly:'readOnly',//只读
        //linecap:'round',
        //inputColor:'#f60', //数字的颜色,
        cursor:false,
        change:function(v){
            console.log(1);
        }
    });
    console.log($('.dial').val())
    //重新render
    // $('.dial').trigger(
    //     'configure',
    //     {
    //         "fgColor":"red",
    //         "skin":"tron",
    //         "cursor":false
    //     }
    // );
    //改变其val值

    //标准的定时控制动画 这里有个BUG 不能直接使用 cache.requestAnimationFrame 需要把 var s = cache.requestAnimationFrame 保存在一个变量中
    var WIN = window;
    var requestAnimationFrame  = function(callback){
        var fn = 	WIN.requestAnimationFrame ||
            WIN.mozRequestAnimationFrame ||
            WIN.webkitRequestAnimationFrame ||
            WIN.msRequestAnimationFrame ||
            WIN.oRequestAnimationFrame ||
            function(callback){return setTimeout(callback, 1000/60)};
        return fn(callback);
    };

    //标准去定时控制动画
    var cancelAnimationFrame = function(id){
        var fn = 	WIN.cancelAnimationFrame ||
            WIN.mozCancelAnimationFrame ||
            WIN.webkitCancelAnimationFrame ||
            WIN.msCancelAnimationFrame ||
            WIN.oCancelAnimationFrame ||
            function(id){return clearTimeout(id)};
        return fn(id);
    };

    //函数：动画函数
    var easing = {
        inEase:function(pos) {
            return -(Math.pow(pos - 1, 2) - 1);
        },
        outEase:function(pos) {
            return Math.pow(pos, 2);
        }
    };

    //函数：动画
    function animate(me, begin, end, time, fn, type){
        var beginTime = new Date().getTime(),
            diffPos = end - begin;
        cancelAnimationFrame(me.animateId);
        me.animateId = requestAnimationFrame(function loop(){
            var changeTime = new Date().getTime() - beginTime,
                diff = Math.floor( diffPos * easing[!type ? 'inEase' : 'outEase']( changeTime/time ) ) + begin;
            if(changeTime < time){
                fn(diff);
                me.animateId = requestAnimationFrame(loop);
            }else{
                fn(end);
            }
        });
    }

    animate($('.dial'), 0, 100, 15000, function(val){
        $('.dial').val(val).trigger('change');
        //2.8是200/(80-10)得到的 rgb(200,0,0);
        //红色颜色加深，绿色颜色变浅
        var redCount = 48;
        var red = Math.floor(2*val);
        var green = 200-Math.floor(2*val);
        $('.dial').trigger(
                'configure',
                {
                    "fgColor":"rgb("+green+","+red+",90)"
                }
        );
        $('span').html(val);
    });
});