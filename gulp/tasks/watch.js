/**
 * Created by wb-sfzy189670 on 2016/6/7.
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config').less;
gulp.task('watch', function () {
    watch(config.src, function () {  gulp.start('less');  });
});