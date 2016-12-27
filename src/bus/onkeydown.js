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
                block.randomEatBlock();
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
            case 107:
                block.attr.backgroundColor=randomBgColor();
                block.add();
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
        divLength:$("div").length,
        left:0,
        top:0,
        pLeft:0,
        pTop:0,
        divLeft:0,
        divTop:0,
        moveFoot:2,
        beforeLeft:0,
        beforeTop:0,
        historyLeft:0,
        historyTop:0,
        eatBgColor:"",
        leftMove:false,
        rightMove:false,
        topMove:false,
        downMove:false,
        attr:{
            borderRadius:"50%",
            backgroundColor:randomBgColor(),
            position:"absolute",
            display:"inline-block",
            top:0,
            left:0
        },
        render:function(){
            var me=this;
            me.attr.left=0;
            me.attr.top=0;
            $("body").html($("<div></div>").css({
                "width":(me.WIDTH+"px"),
                "height":(me.HEIGHT+"px")
            }).css(me.attr));
            // $("[data-content='content']").css({left:0,top:0});
            me.left=0;
            me.top=0;
            moveInterval.times=500;
        },
        randomEatBlock:function(){
            var me=this;
            me.eatBgColor=randomBgColor();
            $("body").prepend($("<p></p>").css({
                "width":(me.WIDTH+"px"),
                "height":(me.HEIGHT+"px")
            }).css({
                borderRadius:"50%",
                backgroundColor:me.eatBgColor,
                position:"absolute",
                display:"inline-block",
                top:mathRandom(0,window.innerHeight),
                left:mathRandom(0,window.innerWidth)
            }));
        },
        destroy:function(){
            var me=this;
            $("p").remove();
        },
        add:function(){
            var me=this;
            me.attr.left=parseInt($($("div")[0]).prop('style').left)-me.WIDTH+"px";
            me.attr.top=$($("div")[0]).prop('style').top;
            me.attr.backgroundColor=me.eatBgColor;
            $("body").prepend($("<div></div>").css({
                "width":(me.WIDTH+"px"),
                "height":(me.HEIGHT+"px")
            }).css(me.attr));
            me.divLength=$('div').length;
            if(me.divLength%2==0){
                moveInterval.times>50? moveInterval.times-=50: moveInterval.times=50;
            }
            // console.log(parseInt($($("div")[0]).prop('style').left));
        },
        changePositionLeft:function(){
            var me=this;
            if(me.divLength>=2){
                me.changePosition();
                // $($("div")[me.divLength-1]).css({"left":this.left+"px"});
            }else{
                $($("div")[me.divLength-1]).css({"left":this.left+"px"});
            }
        },
        changePositionTop:function(){
            var me=this;
            if(me.divLength>=2){
                me.changePosition();
                // $($("div")[me.divLength-1]).css({"top":this.top+"px"});
            }else{
                $($("div")[me.divLength-1]).css({"top":this.top+"px"});
            }
        },
        changePosition:function(){
            var me=this;
            me.beforeLeft=$($("div")[me.divLength-1]).prop('style').left;
            me.beforeTop=$($("div")[me.divLength-1]).prop('style').top;
            $($("div")[me.divLength-1]).css({"left":this.left+"px","top":this.top+'px'});
            me.historyTop=me.beforeTop;
            me.historyLeft=me.beforeLeft;
            for(var i=me.divLength-2;i>=0;i--){
                me.beforeTop=$($("div")[i]).prop('style').top;
                me.beforeLeft=$($("div")[i]).prop('style').left;
                $($("div")[i]).css({"left":me.historyLeft,"top":me.historyTop});
                me.historyTop=me.beforeTop;
                me.historyLeft=me.beforeLeft;
                // console.log(me.historyLeft);
                // console.log($($("div")[i]).prop('style').left);
                // console.log(me.historyLeft);
            }
        },
        changePositionLeftALL:function(){
            var me=this;
            $($("div")[me.divLength-1]).css({"left":this.left+"px"});
            for(var i=me.divLength-2;i>=0;i--){
                $($("div")[i]).css({"left":parseInt($($("div")[i+1]).prop('style').left)-me.WIDTH+"px"});
            }
        },
        changePositionTopALL:function(){
            var me=this;
            $($("div")[me.divLength-1]).css({"top":this.top+"px"});
            $($("div")[me.divLength-2]).css({"top":this.top+"px"});
            for(var i=me.divLength-2;i>=0;i--){
            }
        },
        mathEat:function(){
            var me=this;
            me.pLeft=parseInt($($("p")[0]).prop('style').left);
            me.pTop=parseInt($($("p")[0]).prop('style').top);
            //console.log(pLeft+":"+pTop);
            me.divLeft=parseInt($($("div")[me.divLength-1]).prop('style').left);
            me.divTop=parseInt($($("div")[me.divLength-1]).prop('style').top);
            //console.log(divLeft);
            if(me.divLeft+me.WIDTH>=me.pLeft&&me.divLeft<=me.pLeft+me.WIDTH
                &&me.divTop+me.HEIGHT>=me.pTop&&me.divTop<=me.pTop+me.HEIGHT){
                me.destroy();
                me.add();
                me.randomEatBlock();
            }
        },
        moveLeft:function(){
            var me=this;
            me.leftMove=true;
            if(me.left<window.innerWidth){me.left+=me.WIDTH/me.moveFoot}
            else(me.left=0);
            me.divLength=$('div').length;
            me.changePositionLeft();
            me.mathEat();
            // console.log(me.divLength);
        },
        moveRight:function() {
            var me = this;
            me.rightMove=true;
            if(me.left>0){me.left -= me.WIDTH/me.moveFoot}
            else(me.left=window.innerWidth);
            me.divLength=$('div').length;
            me.changePositionLeft();
            me.mathEat();
        },
        moveTop:function(){
            var me = this;
            me.topMove=true;
            if(me.top>0){me.top -= me.HEIGHT/me.moveFoot}
            else{me.top=window.innerHeight}
            me.divLength=$('div').length;
            me.changePositionTop();
            me.mathEat()
        },
        moveDown:function(){
            var me = this;
            me.downMove=true;
            if(me.top<window.innerHeight){ me.top += me.HEIGHT/me.moveFoot}
            else{me.top=0}
            me.divLength=$('div').length;
            me.changePositionTop();
            me.mathEat();
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
    // console.log(block.attr.backgroundColor);
    // console.log(ary("s","s",2));
    // console.log(block.WIDTH);
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