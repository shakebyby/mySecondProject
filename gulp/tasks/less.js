var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../config').less;
gulp.task('less', function () {
    return gulp.src(config.src).pipe(less(config.settings)).pipe(gulp.dest(config.dest))});