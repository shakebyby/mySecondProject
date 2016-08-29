define(function (require, t, o) {
    function n() {
        g == i.length - 1 ? g = 0 : g++, $(".body-cursol").animate({left: -g * c + "px"}, .5)
    }
    var $= require("jQuery"), c = ($(".nav-cursol>li"), $(".body-cursol img").get(0).clientWidth), i = $(".body-cursol img").get();
    console.log(i), $(".body-cursol").css({width: c * $(".body-cursol img").get().length + "px"}), $(".sf-cursol").css({height: $(".body-cursol img").get(0).clientHeight + "px"});
    var r = {
        height: $(".body-cursol img").get(0).clientHeight + "px",
        lineHeight: $(".body-cursol img").get(0).clientHeight + "px"
    };
    $(".sf-cursol .prev").css(r), $(".sf-cursol .next").css(r), $(".nav-cursol").on("mouseenter", "li", function (e) {
        var t = e || window.event;
        t.stopPropagation(), t.cancelBubble = !0;
        var o = t.target.getAttribute("data-role");
        $(".body-cursol").animate({left: -o * c + "px"}, .5), g = o
    });
    var s = 0;
    $(".prev").on("click", function (e) {
        0 == s ? s = i.length - 1 : s < i.length && s--, $(".body-cursol").animate({left: -s * c + "px"}, .5)
    }), $(".next").on("click", function (e) {
        s == i.length - 1 ? s = 0 : s >= 0 && s++, $(".body-cursol").animate({left: -s * c + "px"}, .5)
    });
    var u = null, g = 0;
    u = setInterval(n, 2e3), $(".sf-cursol").on("mouseenter", function (e) {
        clearInterval(u), u = null, console.log(i.indexOf(e.target))
    }).on("mouseleave", function () {
        u = setInterval(n, 2e3)
    })
});