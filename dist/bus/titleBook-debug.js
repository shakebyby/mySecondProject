define("bus/titleBook-debug", ["js/jQuery-debug"], function(require, exports, module) {
    function getBook(data, tem, ul) {
        var template = {
            li: ["<li>", "<a href>", data, "</a>", "</li>"].join("")
        };
        ul ? ul.append(template[tem]) : box.append(template[tem])
    }
    var $ = require("js/jQuery-debug"),
        $div = $(".sf-titleContent"),
        box = ($div.find("h1"), $(".sf-titleBook").find("ul"));
    $div.each(function(index, value, arr) {
        var oDiv = $(value),
            $ul = $("<ul></ul>").addClass("sf-mr20");
        oDiv.find("h1").each(function(index, value, arr) {
            getBook($(value).text(), "li")
        }), oDiv.find("h2").each(function(index, value, arr) {
            getBook($(value).text(), "li", $ul), box.append($ul)
        })
    })
});
"use strict";
define("js/jQuery-debug", [], function(require, exports, module) {
    return jQuery
});