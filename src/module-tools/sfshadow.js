/**
 * Created by wb-sfzy189670 on 2016/6/16.
 */
define(function(require,exports,module){
    var $=require("jQuery");
    var sf={};
    sf.shadow=function(obj){
        var timer1 = null;
        var div = document.getElementsByClassName("shadow-body")[0];
        var px2 = obj.px;
        // div.addEventListener("mouseover",function(e){file(e, true)();console.log(11)});
        // div.onmouseout = function(e){file(e, false)();console.log(22)};
        $(div).mouseenter(function(e){file(e, true)()});
        $(div).mouseleave(function(e){file(e, false)()});
        function file(event, p) {
            // event.stopPropagation();
            // event.cancelBubble=true;
            console.log(event.target);
            //if(event.target != div) return function(){}
            return function () {
                clearInterval(timer1);
                timer1 = null;
                timer1 = setInterval(function () {
                    if (p) {
                        obj.px--;
                        if (obj.px <= 0) {
                            clearInterval(timer1);
                            timer1 = null;
                        }
                    }
                    else {
                        obj.px++;
                        if (obj.px >= px2) {
                            clearInterval(timer1);
                            timer1 = null;
                        }
                    }
                    document.getElementsByClassName("shadow")[0].style.top = obj.px + 'px';
                }, obj.ss);
            }
        }
    };
    return sf
});