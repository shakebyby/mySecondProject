"use strict";

define(function (require, exports, module) {
    var $ = require("jQuery");
    var React = require("react");
    var ReactDOM = require("reactDom");
    var LikeButton = React.createClass({
        displayName: "LikeButton",
        getInitialState: function getInitialState() {
            return { liked: false };
        },
        handleClick: function handleClick(event) {
            this.setState({ liked: !this.state.liked });
        },
        render: function render() {
            var text = this.state.liked ? 'like' : 'haven\'t liked';
            return React.createElement(
                "p",
                { onClick: this.handleClick },
                "You ",
                text,
                " this. Click to toggle.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null)
            );
        }
    });
    ReactDOM.render(React.createElement(LikeButton, null), document.getElementById('example'));
});