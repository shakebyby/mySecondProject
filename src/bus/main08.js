/**
 * Created by wb-sfzy189670 on 2016/7/18.
 */
'use strict';
define(function(require,exports,module){
    var $=require("jQuery");
    $(window).resize(function() {
        var width = $(this).width();
        var height = $(this).height();
        console.log(width);  
        width<992?
            $("#text").removeClass("slideInLeft").addClass("animated slideInUp"):
            $("#text").removeClass("slideInUp").addClass("animated slideInLeft");
        width<992?
            $("#text2").removeClass("zoomInUp").addClass("animated zoomInLeft"):
            $("#text2").removeClass("zoomInLeft").addClass("animated zoomInUp");
        width<992?
            $("#text3").removeClass("fadeInDown").addClass("animated fadeInUp"):
            $("#text3").removeClass("fadeInUp").addClass("animated fadeInDown");
    });
  
    console.log(window.innerWidth);
});