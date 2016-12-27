/**
 * Created by ermin.zem on 2014/11/7.
 */

var gulp = require('gulp');
var path = require('path');

var task = require(path.join(process.cwd(), "gulpfile.js"));
task(gulp, function(){

});
gulp.start(['default']);