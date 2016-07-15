/**
 * Created by wb-sfzy189670 on 2016/7/5.
 */
"use strict"
define(function(require,exports,module){
        //方法1：面向过程
    console.log(this);
        var $=require("jQuery");
    //     var xbox=0,ybox=0;
    //     $(".box").on("mousedown",function(e){
    //         xbox = e.clientX - this.offsetLeft;
    //         ybox = e.clientY - this.offsetTop;
    //         var me=this;
    //         document.onmousemove = function (e){
    //             var e = e || window.event;
    //             $(".box").get(0).style.left = (e.clientX - xbox) + 'px';
    //             $(".box").get(0).style.top = (e.clientY - ybox) + 'px';
    //         };
    //
    //         document.onmouseup = function (){
    //             document.onmousemove = null;
    //             $(me).animate({
    //                 top:0,
    //                 left:0
    //             })
    //         };
    // });
        //方法2：面向对象
    function Drop(clas){
        this.obj=document.getElementsByClassName(clas)[0];
        this.xbox=0;
        this.ybox=0;
    }
    Drop.prototype.init = function (){
        var me = this;
        console.log(this.obj)
        this.obj.onmousedown = function (e){
            var e = e || event;
            me.mouseDown(e);
            // 阻止默认事件
            return false;
        };
    };
    Drop.prototype.mouseDown = function (e){
        // this指针
        var me = this;
        this.xbox = e.clientX - this.obj.offsetLeft;
        this.ybox = e.clientY - this.obj.offsetTop;
        document.onmousemove = function (e){
            var e = e || window.event;
            me.mouseMove(e);
        };
        document.onmouseup = function (){
            me.mouseUp();
        }
    };
    Drop.prototype.mouseMove = function (e){
        this.obj.style.left = (e.clientX - this.xbox) + 'px';
        this.obj.style.top = (e.clientY - this.ybox) + 'px';
    };
    Drop.prototype.mouseUp = function (){
        document.onmousemove = null;
        document.onmouseup = null;
    };
    var drop=new Drop("box");
    console.log(drop);
    drop.init();
});