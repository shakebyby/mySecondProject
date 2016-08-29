/**
 * Created by wb-sfzy189670 on 2016/6/7.
 */
(function(){
    var config={
        base:"./src/",
        alias:{
            jQuery:"js/jQuery",
            react:"js/react",
            reactDom:"js/react-dom",
            reflux:"js/reflux",
            masonry:"js/masonry.pkgd",
            handlebars:"js/handlebars-v4.0.5"
        },
        path:{
          bootstrap:"bootstrap",
        },
        debug:true,
        charset:"utf-8"
    };
    seajs.config(config);
    if (typeof define === 'function') {
        define(function(require, exports, module) {
            module.exports = config;
        });
    }
    return config;
}());