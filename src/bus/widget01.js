/**
 * Created by wb-sfzy189670 on 2016/8/22.
 */
define(function(require,exports,module){
    var Handlebars = require("module-tools/handlebars");
    var react = require("react");
    var $ = require("jQuery");
    var json={
        people:[
            {name:"jake",age:14,
                href:[
                    {name:"汽车之家",href:"https://www.baidu.com"},
                    {name:"猎娉网",href:"https://www.baidu.com"},
                    {name:"360",href:"https://www.baidu.com"}
                ]
            },
            {name:"mary",age:16,body:{
                head:"big",
                hand:"strong",
                all:'fat'
            },href:[
                {name:"baidu",href:"https://www.baidu.com"},
                {name:"google",href:"https://www.baidu.com"}
                ]
            },
            {name:"tom",age:15,school:"杭州电子科技大学"},
            {name:"阿萨德",age:33},
            {name:"爱仕达",age:23,school:"中国名航大学"},
            {name:"抢我的",age:43,body:{all:"small"}}
        ],
        time:"2016-05-15"
    };
    console.log(json);
    
    $("#suit-content").html(Handlebars.compile($(".template").html())(json));
    
    console.log(react);
    console.log(Handlebars);
});