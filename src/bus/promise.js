'use strict';

define(function (require, module, exports) {
    var $ = require('jQuery');
    function timeout(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms, 'done');
        });
    }
    timeout(100).then(function (value) {
        console.log(value);
    });

    var promiseOne = new Promise(function (resolve, reject) {
        var blone = false;
        console.log('promise');
        blone ? resolve('true') : reject('false');
    });
    promiseOne.then(function (resolve) {
        console.log(1);
    }, function (reject) {
        console.log(0);
    });
    console.log('123');
    var p1 = new Promise(function (resolve, reject) {
        var game = false;
        game ? resolve('good') : reject('bad');
    });
    var p2 = new Promise(function (resolve, reject) {
        resolve(p1);
        reject(p1);
    });
    p2.then(function (value) {
        console.log(value);
    }, function (error) {
        console.log(error);
    });
    var p3 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            return reject(new Error('fail'));
        }, 3000);
    });
    var p4 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve(p3);
        }, 1000);
    });
    // p4.then(result=>console.log(result),reject=>console.log(reject));
    p4.then(function (result) {
        return console.log(result);
    }).catch(function (error) {
        return console.log(error);
    });
    var p5 = new Promise(function (resolve, reject) {
        throw new Error('我不是错误');
    });
    p5.then(function (value) {
        return console.log(value);
    }).catch(function (error) {
        return console.log(error);
    });
    // p5.then(value => console.log(value)).then(null,error=>console.log(error));
    var p6 = new Promise(function (resolve, reject) {
        resolve();reject();
    });
    var pAll01 = new Promise(function (resolve, reject) {
        resolve(function () {});
    });
    var pAll02 = new Promise(function (resolve, reject) {
        resolve({ "name": "tom" });
    });
    var pAll03 = new Promise(function (resolve, reject) {
        resolve([1, 2, 3]);
    });
    Promise.all([pAll01, pAll02, pAll03]).then(function (value) {
        return console.log(value);
    }).catch(function (error) {
        return console.log(error);
    });
});