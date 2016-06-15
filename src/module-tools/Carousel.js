/**
 * Created by wb-sfzy189670 on 2016/6/13.
 */
define(function(require,exports,module){
    var $=require('jQuery');
    var $lisImg=$(".carousel-img>ul>li");
    var $lisRound=$(".carousel-round>ul>li");
    var ani={
        display:"inline-block",
    };
    for(var i=0;i<$lisRound.length;i++){
        console.log($lisRound[i]);
        $($lisRound[i]).bind("click",function(e){
            var e=event || window.event;
            var target=e.target||e.srcElement;
            e.stopPropagation();
            e.cancelBubble=true;
            console.log(target.getAttribute("data-role"));
           $($lisImg[target.getAttribute("data-role")]).show(500).siblings().hide();
        })
    }
    var timer=null;
    function s(){
        var i=0;
        return function () {
            $($lisImg[i]).show(500).siblings().hide();
            i++;
            if(i==5){
                i=0;
            }
        }
    }
    timer=setInterval(s(),2000);
    $(".container-carousel").bind("mouseover",function(e){
        clearInterval(timer);
    }).bind("mouseout",function(e){
        timer=setInterval(s(),2000);
    });
});