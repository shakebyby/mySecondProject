/**
 * Created by wb-sfzy189670 on 2016/6/7.
 */
(function(){
    var global = typeof window == 'undefined' ? {} : window;
    global.CONFIG = global.CONFIG || {};
    var base = global.CONFIG.assetsLink ? global.CONFIG.assetsLink : './src';
    var config={
        base:base,
        alias:{
            jQuery:"js/jQuery",
            react:"js/react",
            reactDom:"js/react-dom",
            reflux:"js/reflux",
            reactAlibaba:"//g." +
            ".com/tinglejs/lib-react/react/0.13.3/react",
            JSXTransformer:"//g.alicdn.com/tinglejs/lib-react/react/0.13.3/JSXTransformer.js",
            masonry:"js/masonry.pkgd",
            handlebars:"js/handlebars-v4.0.5",
            zooming:'js/zooming',
            radialIndicator:'js/radialIndicator',
            knob:'js/jquery.knob',
        },
        path:{
          bootstrap:"bootstrap",
        },
        debug:true,
        charset:"utf-8",
        map: [
            [ '.js', '.js?20161219' ] //时间戳版本控制
        ]
    };

    // 仅限浏览器时使用
    if (typeof seajs !== 'undefined') {

        seajs.config(config);
        // 在浏览器下新增接口，确保异步加载，同步执行。
        ;(function(seajs, $){

            var useList = [],
                arrPro  = Array.prototype,
                concat  = arrPro.concat,
                slice   = arrPro.slice;
            // 暴露出增加的方法
            seajs.add = function(){
                return useList = concat.apply( useList, slice.call(arguments) );
            };

            // DOM加载完成
            $(function(){
                var $body = $('body'),
                    widgetMap = [],
                    widgetArr = [];
                // 遍历节点
                $('[widget]').each(function(){
                    var self = $(this);
                    widgetMap[ widgetArr.push( self.attr('widget') ) - 1 ] = self;
                });

                // 顺序:
                // 1. <div widget="x"></div>; 配置 widget-trigger 就是用trigger入参
                // 2. sea.add('x');
                useList = concat.call(arrPro, widgetArr, useList);
                useList.length && seajs.use(useList, function(){
                    $.each(arguments, function(i){
                        var element = widgetMap[i],
                            config = {};
                        element && (config[ element.attr('widget-trigger') === undefined ? 'element' : 'trigger'] = element);
                        typeof this === 'function' && new this(config);
                    });
                });
            });
            $(window).on('load', function(){
                window.isLoaded = true;
            });
        })(seajs, $);
    }

    if (typeof define === 'function') {
        define(function(require, exports, module) {
            module.exports = config;
        });
    }
    return config;
}());