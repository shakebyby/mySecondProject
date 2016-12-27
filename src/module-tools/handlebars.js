/**
 * Created by wb-sfzy189670 on 2016/8/24.
 */
define(function(require,exports,module){
    require("handlebars");
    console.log(Handlebars);
    //比较 相等
    Handlebars.registerHelper('isEqual', function(a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    //比较 不等
    Handlebars.registerHelper("noEqual",function(a,b,options){
        if(a!==b){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    });
    //比较 大于等于
    Handlebars.registerHelper("ltEqual",function(a,b,options){
        if(a>=b){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    });
    //比较 小于等于
    Handlebars.registerHelper("gtEqual",function(a,b,options){
        if(a<=b){
            return options.fn(this);
        }else{
            return option.inverse(this);
        }
    });
    //英文转大写
    Handlebars.registerHelper("EngUC",function(str){
        return str.toUpperCase();
    });
    //英文转小写
    Handlebars.registerHelper("EngLC",function(str){
        return str.toLowerCase();
    });
    
    module.exports = Handlebars;
});