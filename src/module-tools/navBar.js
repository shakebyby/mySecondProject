/**
 * Created by wb-sfzy189670 on 2016/6/15.
 */
define(function(require,exports,module){
    var $=require("jQuery");
    $(function(){
        $(".sf-navbar>li a").click(function(event) {
            event.stopPropagation();
            event.cancelBubble=true;
            var target = event.target || event.srcElement;
            $("ul li a").removeClass("redB");
            $(target).addClass("redB");
            var index=target.getAttribute("data-title") ;
            console.log(index);
            var id='#'+'index-'+index ;
            $("html,body").animate({scrollTop: $(id).offset().top},500);
        });
    });
});