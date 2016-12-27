/**
 * Created by wb-sfzy189670 on 2016/11/4.
 */
define(function(require,exports,module){
    var $ = require('jQuery');
    var $div = $('.sf-titleContent');
    var titles = $div.find('h1');
    var box = $('.sf-titleBook').find('ul');
    // titles.each(function(index,value,arr){
    //     var title = $(value);
    //     getBook(title.text(),index+1,'li');
    // });
    $div.each(function(index,value,arr){
        var oDiv = $(value);
        var $ul = $('<ul></ul>').addClass('sf-mr20');
        oDiv.find('h1').each(function(index,value,arr){
            getBook($(value).text(),'li');
        });
        oDiv.find('h2').each(function(index,value,arr){
            getBook($(value).text(),'li',$ul);
            box.append($ul);
        });
    });
    function getBook(data,tem,ul){
        var template = {
            li:[
                '<li>',
                     '<a href>',
                        data,
                     '</a>',
                '</li>'
            ].join('')
        };
        !ul ? box.append(template[tem]) : ul.append(template[tem]);
    }
});