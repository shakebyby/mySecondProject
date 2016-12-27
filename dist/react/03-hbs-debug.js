define("react/03-hbs-debug", ["common/handlerbars-debug"], function(require, exports, module) {
    var Handlerbars = require("common/handlerbars-debug"),
        str = "{{#each this}}    <div>{{name}}</div>    <p>{{sex}}</p>    {{/each}}",
        compile = Handlerbars.compile(str);
    return compile.source = str, compile
});