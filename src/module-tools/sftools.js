/**
 * Created by wb-sfzy189670 on 2016/6/29.
 */
"use strict";
define(function(require,exports,module){
    //js训练——工具类
    var sf={};
    //一些基础的判断方法
    //是否是null
    var isNull=sf.isNull=function(n){
        return n===null;
    };
    //是否是undefined
    var isUndefined=sf.isUndefined=function(q){
        return q===void 0;
    };
    //是否是String，Number，Date，Error ,Array ,RegExp,Math,Boolean,Object,Function
    "String,Number,Date,Error,Array,RegExp,Math,Boolean,Object,Function".replace(/\w+/g,function(i){
       sf["is"+i]=function(n){
           return {}.toString.call(n)==="[object "+i+"]"
       }
    });
    var isString=sf.isString,
        isNumber=sf.isNumber,
        isDate=sf.isDate,
        isError=sf.isError,
        isArray=sf.isArray,
        isRegExp=sf.isRegExp,
        isMath=sf.isMath,
        isBoolean=sf.isBoolean,
        isObject=sf.isObject,
        isFunction=sf.isFunction;
    //关于js的一些语法结构
    var y=0;
    var x
    ++
        y;
    console.log(x);//undefined
    console.log(y);//1
   //数组去重
    var isUtil=sf.Util=function(arr){
       var arr2=[];
       for(var i=0;i<arr.length;i++){
           if(arr2.indexOf(arr[i])==-1)arr2.push(arr[i]);
       }
        return arr2;
    };
    //两个数之间取随机整数
    var mathRandom=sf.mathRandom=function(min,max){
        return Math.floor((max-min+1)*Math.random()+min);
    };
    //双色球训练
    sf.doubleBall={
        REDBALL:6,
        BLUEBALL:1,
        red:[],
        double:"",
        randomBlue:function(){
            return mathRandom(1,16)
        },
        randomRed:function(){
            return mathRandom(1,33)
        },
        moreRed:function(){
            var arr=[];
            for(var i=0;i<this.REDBALL;i++){
                arr[i]=this.randomRed();
            }
            arr=isUtil(arr);
            this.red=arr;
        },
        update:function(){
            var arr=this.red,self=this,len=this.red.length;
            if(this.red.length<this.REDBALL){
                for(var i=len;i<this.REDBALL;i++){
                    arr[i]=this.randomRed();
                }
                arr=isUtil(arr);
                this.red=arr;
                this.update();
            }
        },
        start:function(){
            var arr=[];
            this.moreRed();
            this.update();
            arr=this.red.sort(function(a,b){return a-b;});
            arr.push(this.randomBlue());
            this.double=arr;
        }
    };
    document.getElementsByTagName("button")[0].onclick=function(){
        document.getElementsByTagName("ul")[0].innerHTML="";
        sf.doubleBall.start();
    };
     console.log(sf.doubleBall.start());
    // document.getElementsByTagName("body")[0].innerHTML="<H1>"+sf.doubleBall.double.join("+")+"</H1>";
    // console.log(sf.doubleBall.double);
    // var node=document.createElement("h1"); //创建一个li节点
    // var textnode=document.createTextNode(sf.doubleBall.double+""); //创建一个文本节点内容
    // node.appendChild(textnode); //将文本节点内容，添加到li节点里面
    // document.getElementsByTagName("body")[0].appendChild(node);

    return sf;
});