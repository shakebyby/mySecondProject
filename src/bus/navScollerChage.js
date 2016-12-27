/**
 * Created by wb-sfzy189670 on 2016/9/14.
 */
define(function(require,exports,module){
    var $ = require("jQuery");
    var $nav=$("[data-nav='scoller']");
    var topNav=$nav[0].offsetTop;
    console.log(topNav);
   $(window).on('scroll',function(){
       var scrollTop=document.body.scrollTop;
       console.log(scrollTop);
       if(scrollTop>=topNav){
            $nav.css({'position':'fixed','top':0,'left':0});
           // $('[data-nav-first="child"]').css({
           //     "margin-top":"55px"
           // });
           console.log(2);
       }else{
           $nav.css({
               'position':'absolute',
               'top':'370px',
           });
           // $('[data-nav-first="child"]').css({
           //     "margin-top":0
           // })
       }
   })

});