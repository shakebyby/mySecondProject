define((require,module,exports) => {
    //差一个babel-polyfill 需要安装此插件
    function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }

    var hw = helloWorldGenerator();
});