define((require,module,exports) => {
    var s = new Set();
    [2,3,4,5,2,2,5,"2"].map(x => s.add(x));
    console.log(s);
    for(let i of s){
        console.log(i);
    }
    var items =  new Set([1,2,3,4,5,5,5,6,6,6,6,6]);
    console.log(items.size);
    var nans = new Set();
    [NaN,NaN,NaN].map(x => nans.add(x));
    console.log(nans);
    let setObj = new Set();
    setObj.add({});
    console.log("ObjsetSize",setObj.size);
    setObj.add({});
    console.log("ObjsetSize",setObj.size);
    let setObjs = new Set();
    setObjs.add(NaN);
    setObjs.add(NaN);
    setObjs.add(NaN);
    console.log(setObjs);
    
});