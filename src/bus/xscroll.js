/**
 * Created by wb-sfzy189670 on 2016/9/22.
 */
define(function(require,exports,module){
    var $=require('jQuery');
    var imagesTransform={
        COUNT:$('.sf-adv-images>li').length,
        LEFT:$('.sf-adv').width(),
        lis:$('.sf-adv-images>li'),
        times:800,
        timer:null,
        setTime:function(){
            var me=this;
            this.timer=setInterval(function(){
                me.TransFormStart();
                me.TransFormEnd();
            },1000);
        },
        init:function(){},
        start:function(){},
        initZindex:function(){
            var me=this;
            for(var i=0;i<this.lis.length;i++){
              $(me.lis[i]).css({
                  zIndex:this.lis.length--
              })
            }
        },
        TransFormStart:function(){
            var me=this;
            $(me.lis[0]).animate({
                left:-me.LEFT/2+'px',
            },me.times);
            $(me.lis[1]).animate({
                left:me.LEFT/2+'px',
            },me.times);
        },
        TransFormEnd:function(){
          var me=this;
            $(me.lis[0]).animate({
                left:0
            },me.times);
            $(me.lis[1]).animate({
                left:0
            },me.times);
        },
    };
    imagesTransform.initZindex();
    // console.log(imagesTransform);
    function foo(obj){
        if(typeof obj =="object"){
            if(obj.add!=undefined)this.add=obj.add;
        }
    }
    foo.prototype.add=true;
    foo.prototype.addNum=function(a,b){
        if(this.add){
            return a+b;
        }else{
            return a-b
        }
    };
    foo.prototype.add=true;
    var sf=new foo({add:false});
    var sf2=new foo();
    var sf3=new foo();
    sf3.addNum=function(a,b){
        return a*b;
    }
    console.log(sf);
    console.log(sf2);
    console.log(sf3);
    console.log(sf.addNum(3,6));
    console.log(sf2.addNum(2,4));
    console.log(sf3.addNum(2,4));
})