/**
 * Created by wb-sfzy189670 on 2016/7/20.
 */
define(function(require,exports,module){
    var $=require("jQuery");
    var ary1=[1,2,3,4,5,6,-2];
    var ary2=[3,15,8,2,1,2,3,4,1,3,2,4,4,14,15];
    var mathRandom=function(min,max){
        return Math.floor((max-min+1)*Math.random()+min);
    };
    function makeBlue(num){
        var arr=[];
        for(var i=0;i<num;i++){
            arr[i]=mathRandom(1,16);
        }
        return arr;
    }
    function makeRed(){
        var arr=[];
        for(var i=0;i<6;i++){
            arr[i]=mathRandom(1,33);
        }
    }
    console.log(makeRed());
    var isUtil=function(arr){
        var arr2=[];
        for(var i=0;i<arr.length;i++){
            if(arr2.indexOf(arr[i])==-1)arr2.push(arr[i]);
        }
        return arr2;
    };
    var ismin=function(arr){
        var min=arr[0];
        for(var i=0;i<arr.length;i++){
            if(min>arr[i])min=arr[i];
        }
        return min
    };
    var ismax=function(arr){
        var max=arr[0];
        for(var i=0;i<arr.length;i++){
            if(max<arr[i])max=arr[i];
        }
        return max
    };
    function ad(arr){
        arr=arr.sort(function(a,b){return a-b;});
        //console.log(arr);
        var arrs=[],arrnum=[];
        for(var i=0;i<arr.length;i++){
            var k=arr.indexOf(arr[i]);
            var j=arr.indexOf(arr[i+1]);
            if(k!=j){
                if(j==-1){
                    arrs.push(arr[k]+":"+(arr.length-k)+'次'+" 概率:"+((arr.length-k)/arr.length).toFixed(2));
                    arrnum.push(arr.length-k);
                }else{
                    arrs.push(arr[k]+":"+(j-k)+'次'+" 概率:"+((j-k)/arr.length).toFixed(2));
                    arrnum.push(j-k);
                }
            }
        }
        console.log(arrnum);
        console.log(arrnum.indexOf(ismin(arrnum))+1);
        console.log(arrnum.indexOf(ismax(arrnum))+1);
        return arrs;
    }
    console.log(ad(makeBlue(100)));
    console.log(ad(makeBlue(100)));
    console.log(ad(makeBlue(100)));
});