define(function(require,exports,module){
    var $=require("jQuery");
    var React=require("react");
    var ReactDOM=require("reactDom");
    $("body").html("<h1>sdsad <h2>sdasd</h2></h1>");
    var LikeButton = React.createClass({
        getInitialState: function() {
            return {liked: false};
        },
        handleClick: function(event) {
            this.setState({liked: !this.state.liked});
        },
        render: function() {
            var text = this.state.liked ? 'like' : 'haven\'t liked';
            return (
                <p onClick={this.handleClick}>
                    You {text} this. Click to toggle.
                    <br/><br/><br/><br/><br/>
                </p>
            );
        }
    });
    ReactDOM.render(
        <LikeButton />,
        document.getElementById('example')
    );
});