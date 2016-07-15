/**
 * Created by wb-sfzy189670 on 2016/6/28.
 */
define(function(require,exports,modules){
    var man = {
        sex: "nan"
    };
    console.log(man);
    console.log(man.sex);
    console.log(man["sex"]);
    var sf=require("module-tools/sftools");
    function update(){
        for(var i=0;i<sf.doubleBall.double.length;i++){
            var node=document.createElement("li");
            var textnode=document.createTextNode(sf.doubleBall.double[i]);
            node.appendChild(textnode);
            document.getElementsByTagName("ul")[0].appendChild(node);
        }
        document.getElementsByTagName("ul")[0].lastChild.style.backgroundColor=" #43a5eb";
    }
    sf.doubleBall.start();
    update();
    document.getElementsByTagName("button")[0].onclick=function(){
        document.getElementsByTagName("ul")[0].innerHTML="";
        sf.doubleBall.start();
        update();
    };
});