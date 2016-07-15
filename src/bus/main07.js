/**
 * Created by wb-sfzy189670 on 2016/6/29.
 */
'use strict';
define(function(require,exports,module){
    var $=require("jQuery");
    $(".shadow-comment").css({
        height:$(".shadow-comment").siblings().get(0).clientHeight+'px',
        width:$(".shadow-comment").siblings().get(0).clientWidth+'px'
    });
    //mouse 位置
    var divTop=$(".shadow-father")[0].offsetTop;
    var divBot=$(".shadow-father")[0].offsetTop+$(".shadow-father")[0].offsetHeight;
    var divLeft=$(".shadow-father")[0].offsetLeft;
    var divRight=$(".shadow-father")[0].offsetLeft+$(".shadow-father")[0].offsetWidth;
    // console.log(divTop);
    // console.log(divBot);
    // console.log(divLeft);
    // console.log(divRight);
    var x,y;
    $(window).on("mousemove",function (e) {
        x=e.pageX,y=e.pageY;
        //console.log(e.pageX+"+"+e.pageY);
        if(divLeft<x<divRight){
           // console.log("s");
            if(y<divTop){
                if(y>divTop){
                    //console.log("s");
                }
            }else if(y>divBot){

            }


        }else if(divTop<y<divBot){

        }
    })

    $(".shadow-body").mouseenter(function(e){
        e.preventDefault();
        var x=e.pageX;
        var y=e.pageY;
        var divTop=$(this).parent()[0].offsetTop;
        var divBot=$(this).parent()[0].offsetTop+$(".shadow-father")[0].offsetHeight;
        var divLeft=$(this).parent()[0].offsetLeft;
        var divRight=$(this).parent()[0].offsetLeft+$(".shadow-father")[0].offsetWidth;
        console.log(divTop+"+"+divBot+"+"+divLeft+"+"+divRight);
        // console.log(x+"+"+y);
        var $div=$(this).siblings();
        if(divLeft<y<divRight&&x>divBot-10){
           // console.log($(this).siblings());
            $div.css({
               left: divRight+"px",
                top:0
            });
            $div.animate({
                left:0,
                top:0
            })
            console.log("s");
        }else if(divLeft<y<divRight&&x<divTop+10){
            $div.css({
                left: -divRight+"px",
                top:0
            });
            $div.animate({
                left:0,
                top:0
            })
            console.log("a")
        }else if(divTop<x<divBot&&y>divRight-10){
            $div.css({
                top:divBot+"px",
                left:0
            });
            $div.animate({
                left:0,
                top:0
            })
            console.log("z");
        }else if(divTop<x<divBot&&y<divLeft+10){
            $div.css({
                top:-divBot+"px",
                left:0
            });
            $div.animate({
                left:0,
                top:0
            })
            console.log("q")
        }
        // if(x<10&&0<y<100){
        //     $(".shadow-comment").css({
        //         top:$(".shadow-comment").siblings().get(0).clientHeight+'px'
        //     });
        //     $(".shadow-comment").animate({
        //         top:0,
        //         left:0
        //     },200);
        // }else if(y<10&&0<x<100){
        //     $(".shadow-comment").css({
        //         top:0,
        //         left:$(".shadow-comment").siblings().get(0).clientWidth+'px'
        //     });
        //     $(".shadow-comment").animate({
        //         top:0,
        //         left:0
        //     },200);
        // }else if(80<x<90&&-5<y<100){
        //     $(".shadow-comment").css({
        //         top:0,
        //         left:-$(".shadow-comment").siblings().get(0).clientWidth+'px'
        //     });
        //     $(".shadow-comment").animate({
        //         top:0,
        //         left:0
        //     },200);
        // }else if(80<y<90&&-5<x<100){
        //     $(".shadow-comment").css({
        //         top:-$(".shadow-comment").siblings().get(0).clientHeight+'px'
        //     });
        //     $(".shadow-comment").animate({
        //         top:0,
        //         left:0
        //     },200);
        // }
    });
    $(".shadow-body").on("mouseleave",function(e){
        // var x=this.offsetHeight+this.offsetTop-e.pageY;
        // var y=this.offsetLeft+this.offsetWidth-e.pageX;
        // if(x<10&&0<y<100){
        //     $(".shadow-comment").animate({
        //         top:$(".shadow-comment").siblings().get(0).clientHeight+'px',
        //     },200) ;
        // }else if(y<10&&0<x<100){
        //     $(".shadow-comment").animate({
        //         left:$(".shadow-comment").siblings().get(0).clientWidth+'px',
        //     },200) ;
        // }
        e.preventDefault();
        var x=e.pageX;
        var y=e.pageY;
        var divTop=$(".shadow-father")[0].offsetTop;
        var divBot=$(".shadow-father")[0].offsetTop+$(".shadow-father")[0].offsetHeight;
        var divLeft=$(".shadow-father")[0].offsetLeft;
        var divRight=$(".shadow-father")[0].offsetLeft+$(".shadow-father")[0].offsetWidth;
        //console.log(divTop+"+"+divBot+"+"+divLeft+"+"+divRight);
        //console.log(x+"+"+y);
         var $div=$(this).siblings();

        // if(divLeft<y<divRight&&x>divBot-10){
        //     console.log($(this).siblings());
        //     $div.css({
        //         left: 0,
        //         top:0
        //     });
        //     $div.animate({
        //         left:divRight+"px",
        //         top:0
        //     })
        //     console.log("s");
        // }else if(divLeft<y<divRight&&x<divTop+10){
        //     $div.css({
        //         left: 0,
        //         top:0
        //     });
        //     $div.animate({
        //         left:-divRight+"px",
        //         top:0
        //     })
        //     console.log("a")
        // }else if(divTop<x<divBot&&y>divRight-10){
        //     $div.css({
        //         top:0,
        //         left:0
        //     });
        //     $div.animate({
        //         left:0,
        //         top:divBot+"px"
        //     })
        //     console.log("z");
        // }else if(divTop<x<divBot&&y<divLeft+10){
        //     $div.css({
        //         top:0,
        //         left:0
        //     });
        //     $div.animate({
        //         left:0,
        //         top:-divBot+"px"
        //     })
        //     console.log("q")
        // }
    });
});