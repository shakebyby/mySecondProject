define(function(require,module,exports){
    var $=require('jQuery');
    function timeout(ms){
        return new Promise((resolve,reject)=>{
            setTimeout(resolve,ms,'done');
        })
    }
    timeout(100).then((value)=>{
        console.log(value);
    });

    let promiseOne= new Promise((resolve,reject)=>{
        let blone = false;
        console.log('promise');
        blone?resolve('true'):reject('false');
    });
    promiseOne.then((resolve)=>{
        console.log(1);
    },(reject)=>{
        console.log(0);
    });
    console.log('123');
    var p1 = new Promise((resolve,reject)=>{
        let game = false;
        game?resolve('good'):reject('bad');
    });
    var p2=new Promise((resolve,reject)=>{
        resolve(p1);
        reject(p1);
    });
    p2.then((value)=>{
        console.log(value);
    },(error)=>{
        console.log(error);
    });
    var p3 = new Promise((resolve,reject)=>{
        setTimeout(()=>reject(new Error('fail')),3000);
    });
    var p4 = new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(p3),1000);
    });
    // p4.then(result=>console.log(result),reject=>console.log(reject));
    p4.then(result=>console.log(result)).catch(error=>console.log(error));
    var p5 = new Promise((resolve,reject)=>{
        throw new Error('我不是错误');
    });
    p5.then(value=>console.log(value)).catch(error => console.log(error));
    // p5.then(value => console.log(value)).then(null,error=>console.log(error));
    var p6 = new Promise((resolve,reject) => {
        resolve();reject();
    });
    var pAll01 = new Promise((resolve,reject) => {
        resolve(function(){});
    });
    var pAll02 = new Promise((resolve,reject) => {
        resolve({"name":"tom"});
    });
    var pAll03 = new Promise((resolve,reject) => {
        resolve([1,2,3]);
    });
    Promise.all([pAll01,pAll02,pAll03]).then(value =>console.log(value))
        .catch(error => console.log(error));
});