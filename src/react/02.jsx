define((require,exports,module) =>{
    require('reactAlibaba');
    require('JSXTransformer');
    var Lis = React.createClass({
        handChange(e){
            console.log($(e.target).prop('checked'));
            var check=$(e.target).prop('checked');
            console.log(1);
            let set01 = new Set([1,2,2]);
            check?$(e.target).next('span').css({
                color:'#999',
                textDecoration:'line-through',
                fontStyle:'italic'
            }):
                $(e.target).next('span').css({
                    color:'black',
                    textDecoration:'none',
                    fontStyle:"normal",
                });
        },
        render(){
            return (
                <li>
                    <input onChange={this.handChange} type="checkbox"/>
                    <span>{this.props.data}</span>
                </li>
            )
        }
    });
    var HelloWorld = React.createClass({
        getInitialState(){
            return {
                word:"sfzy",
                timers:1,
                cursor:null,
                sure:null,
                data:[],
            }
        },
        handleClick(e){
            this.setState({
                timers:++this.state.timers
            });
            var ele = React.findDOMNode(this.refs.h1);
            ele.style.color="red";
        },
        handChange(e){
            this.setState({
                word:e.target.value
            });
            console.log(e);
        },
        handleAdd(e){
            var ele = React.findDOMNode(this.refs.ul);
            this.state.data.push(this.state.word);
            this.setState({
                data:[...new Set(this.state.data)],
            })
        },
        render(){
            return (
                <div>
                    <h1 ref="h1" onClick={this.handleClick}>
                        {this.state.word} {this.state.timers}
                    </h1>
                    <ul ref="ul">
                        {
                            this.state.data.map(function(result){
                                return <Lis data={result} />
                            })
                        }
                    </ul>
                    <input value={this.state.word} onChange={this.handChange} type="text"/>
                    <button onClick={this.handleAdd}>add+{this.state.data.length}</button>
                </div>
            )
        }
    });
    React.render(<HelloWorld></HelloWorld>,
        document.getElementById("App"));

})