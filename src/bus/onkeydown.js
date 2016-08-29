/**
 * Created by wb-sfzy189670 on 2016/8/26.
 */
define(function(require,exports,module){
    var $=require("jQuery");
    $("body").on("keydown",function(event){
        var e=window.e||event;
        var target=e.target||e.srcElement;
        switch(e.keyCode){
            case 13:
                block.randomBlock();
                block.render();
                moveInterval.clearMove();
                break;
            case 37:
                block.moveRight();
                moveInterval.clearMove();
                moveInterval.setMove(moveInterval.moveRight);
                break;
            case 38:
                block.moveTop();
                moveInterval.clearMove();
                moveInterval.setMove(moveInterval.moveTop);
                break;
            case 39:
                block.moveLeft();
                moveInterval.clearMove();
                moveInterval.setMove(moveInterval.moveLeft);
                break;
            case 40:
                block.moveDown();
                moveInterval.clearMove();
                moveInterval.setMove(moveInterval.moveDown);
                break;
        }
    });
    var mathRandom=function(min,max){
        return Math.floor((max-min+1)*Math.random()+min);
    };
    function randomBgColor(){
        return "rgb("+mathRandom(0,255)+","+mathRandom(0,255)+","+mathRandom(0,255)+")";
    }
    var block={
        WIDTH:mathRandom(50,100),
        HEIGHT:mathRandom(50,100),
        left:0,
        top:0,
        attr:{
            backgroundColor:randomBgColor(),
            position:"absolute",
            top:0,
            left:0
        },
        render:function(){
            var me=this;
            $("body").html($("<div></div>").css({
                "width":(me.WIDTH+"px"),
                "height":(me.HEIGHT+"px")
            }).css(me.attr));
            me.left=0;
            me.top=0;
        },
        moveLeft:function(){
            var me=this;
            if(me.left<window.innerWidth){me.left+=me.WIDTH}
            else(me.left=0);
            me.changePositionLeft();
            console.log(me.left);
        },
        changePositionLeft:function(){
            $("div").css({"left":this.left+"px"});
        },
        changePositionTop:function(){
            $("div").css({"top":this.top+"px"});
        },
        moveRight:function() {
            var me = this;
            if(me.left>0){me.left -= me.WIDTH}
            else(me.left=window.innerWidth);
            me.changePositionLeft();
        },
        moveTop:function(){
            var me = this;
            if(me.top>0){me.top -= me.HEIGHT}
            else{me.top=window.innerHeight}
            me.changePositionTop();
        },
        moveDown:function(){
            var me = this;
            if(me.top<window.innerHeight){ me.top += me.HEIGHT}
            else{me.top=0}
            me.changePositionTop();
        },
        randomBlock:function(){
            var me=this;
            this.WIDTH=mathRandom(50,100);
            this.HEIGHT=mathRandom(50,100);
            this.attr.backgroundColor=randomBgColor();
        }
    };
    function ary(){
        return Array.prototype.slice.call(arguments);
    }
    function randomBlock(){
        block.WIDTH=mathRandom(50,100);
        block.HEIGHT=mathRandom(50,100);
        block.attr.backgroundColor=randomBgColor();
    }
    console.log(block.attr.backgroundColor);
    console.log(ary("s","s",2));
    console.log(block.WIDTH);
    var moveInterval={
        timer:0,
        times:500,
        moveLeft:function(){
            block.moveLeft()
        },
        moveRight:function(){
            block.moveRight();
        },
        moveTop:function(){
            block.moveTop();
        },
        moveDown:function(){
            block.moveDown();
        },
        clearMove:function(){
            var me=this;
            clearInterval(me.timer);
            me.timer=null;
        },
        setMove:function(means){
            var me=this;
            me.timer=setInterval(means,me.times);
        }
    };
});