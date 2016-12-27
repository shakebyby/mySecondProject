"use strict";

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2
    }
    return Array.from(arr)
}
define("react/01-debug.jsx", ["//g..com/tinglejs/lib-react/react/0.13.3/react-debug", "//g.alicdn.com/tinglejs/lib-react/react/0.13.3/JSXTransformer-debug"], function(require, exports, module) {
    require("//g..com/tinglejs/lib-react/react/0.13.3/react-debug"), require("//g.alicdn.com/tinglejs/lib-react/react/0.13.3/JSXTransformer-debug");
    var Lis = React.createClass({
            displayName: "Lis",
            handChange: function(e) {
                var check = $(e.target).prop("checked");
                new Set([1, 2, 2]);
                check ? $(e.target).next("span").css({
                    color: "#999",
                    textDecoration: "line-through",
                    fontStyle: "italic"
                }) : $(e.target).next("span").css({
                    color: "black",
                    textDecoration: "none",
                    fontStyle: "normal"
                })
            },
            render: function() {
                return React.createElement("li", null, React.createElement("input", {
                    onChange: this.handChange,
                    type: "checkbox"
                }), React.createElement("span", null, this.props.data))
            }
        }),
        HelloWorld = React.createClass({
            displayName: "HelloWorld",
            getInitialState: function() {
                return {
                    word: "sfzy",
                    timers: 1,
                    cursor: null,
                    sure: null,
                    data: []
                }
            },
            handleClick: function(e) {
                this.setState({
                    timers: ++this.state.timers
                });
                var ele = React.findDOMNode(this.refs.h1);
                ele.style.color = "red"
            },
            handChange: function(e) {
                this.setState({
                    word: e.target.value
                })
            },
            handleAdd: function(e) {
                React.findDOMNode(this.refs.ul);
                this.state.data.push(this.state.word), this.setState({
                    data: [].concat(_toConsumableArray(new Set(this.state.data)))
                })
            },
            render: function() {
                return React.createElement("div", null, React.createElement("h1", {
                    ref: "h1",
                    onClick: this.handleClick
                }, this.state.word, " ", this.state.timers), React.createElement("ul", {
                    ref: "ul"
                }, this.state.data.map(function(result) {
                    return React.createElement(Lis, {
                        data: result
                    })
                })), React.createElement("input", {
                    value: this.state.word,
                    onChange: this.handChange,
                    type: "text"
                }), React.createElement("button", {
                    onClick: this.handleAdd
                }, "add+", this.state.data.length))
            }
        });
    React.render(React.createElement(HelloWorld, null), document.getElementById("App"))
});