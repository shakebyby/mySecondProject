/**
 * Created by wb-sfzy189670 on 2016/7/18.
 */
define(function(require,exports,module){
    var $=require("jQuery");
    $("[data-dialog]").on("click",function(e){
        e.stopPropagation();
        e.cancelBubble=true;
        // var str=$(e.target).data().dialog;
        // console.log(str);
        $("#"+$(e.target).data().dialog).addClass("animated slideInUp").css({display:"block"});
    });
    $("[data-close]").on("click",function(e){
        e.stopPropagation();
        e.cancelBubble=true;
        var $ele=$("#"+$(e.target).data().close);
        // var str=$(e.target).data().dialog;
        // console.log(str);
        // console.log($(e.target).data().close);
        $ele.removeClass("slideInUp animated").addClass("animated slideOutUp");
        if(!$ele.is(":animated")){
            $ele.css({display:"none"});
        }
    });
})