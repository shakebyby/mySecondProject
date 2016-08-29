define(function(require,exports,module){
    var $ = require("jQuery");
    $(".on-off").on("click",function(e){
        console.log($(this).data("onoff"));
        if($(this).data("onoff")){
            $(this).find("div").css({
                left:48+"px"
            });
            $(this).css({
                backgroundColor:"#3ccb88",
            });
            $(this).data("onoff",false)
        }else{
            $(this).find("div").css({
                left:0
            });
            $(this).css({
                backgroundColor:"#ff4256",
            });
            $(this).data("onoff",true)
        }
    });
    let {length:len}='hello';
    [1,undefined,3].map((x='yes')=>x);
    console.log(len);
    console.log(length);
    let {s:ss}={s:3};
    console.log(Boolean.prototype.toString());
    console.log(ss);
});