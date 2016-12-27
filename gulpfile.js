//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
//
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('bulid/css')); //将会在src/css下生成index.css
});

// gulp.task('default',['testLess',"watch"]); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
//
// gulp.task('watch', function() {
//     // sass
//     gulp.watch('src/**/*.scss', ['sass']).on('change', function(event) {
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[sass]');
//     });
//     //less
//     gulp.watch("src/less/*.less",["testLess"]).on("change",function(event){
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[testLess]');
//     });
// });
// //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
// //gulp.dest(path[, options]) 处理完后文件生成路径

//压缩合并concat 必须不能引用requireDir，需把起删除在gulp
var builder = require('builder-alinw');
var del = require('del');

gulp.task('hephaistos', ['transport', 'cssmin', 'copy'], function() {
    gulp.src('src/hephaistos/**/*.*') //压缩的文件
        .pipe(gulp.dest('dist/hephaistos')) //输出文件夹
    gulp.src('src/assets/**/*.*') //压缩的文件
        .pipe(gulp.dest('dist/assets')) //输出文件夹
});


gulp.task('del', function(){
    del.sync(['dist']);
    console.log('清除dist目录');
});

// 所有任务之前先清除dist目录
gulp.tasks.transport.dep.push('del');
gulp.tasks.less.dep.push('del');
gulp.tasks.copy.dep.push('del');
gulp.tasks.default.dep.push('hephaistos');
gulp.tasks = builder.tasks;

// sass 全部
var sass = require('gulp-ruby-sass');
gulp.task('sass', function() {
    sass('src/**/*.scss')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('src'));
});

// hbs 全部
var rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    wrap = require('gulp-wrap');
gulp.task('hbs', function() {
    gulp.src('src/**/*.hbs')
        .pipe(rename(function(path) {
            path.extname = '-hbs.js';
        }))
        .pipe(replace(/##.*/g, ''))
        .pipe(replace(/\r\n|\n/g, ''))
        .pipe(replace(/"/g, '\\\"'))
        .pipe(replace(/'/g, '\\\''))
        .pipe(wrap('define(function(require, exports, module) { var Handlerbars = require("common/handlerbars"); var str = "<%= contents %>"; var compile = Handlerbars.compile(str); compile.source=str; return compile; });'))
        .pipe(gulp.dest('src'));
});

// babel 全部
var matchRex = /(src.*)\/.*\.*/;
var babel = require('gulp-babel');
gulp.task('babel', function() {
    gulp.src( ['src/**/*.jsx', 'src/**/*.es6'] ).
    pipe( babel( { presets: ['es2015', 'react'] } ).on('error', function(e) {
            console.error('error', e.message);
}) )
    .pipe(gulp.dest('src'));
});

// babel 单个
var babelTask = function(e)  {
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file = match[0];
    gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'react'] } ).on('error', function(e) {
                console.error('error', e.message);
}) )
.pipe(gulp.dest( match[1] ));
};

// 编译全部
gulp.task('compile', ['hbs', 'babel'], function() {
    console.log('over');
});

// watch
gulp.task('watch', function() {
    // sass
    gulp.watch('src/**/*.scss', ['sass']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[sass]');
    });
    // hbs
    gulp.watch('src/**/*.hbs', ['hbs']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[hbs]');
    });
    // babel & jsx
    gulp.watch(['src/**/*.jsx', 'src/**/*.es6']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
        babelTask(event);
    });
});

//requireDir构建方法
// var requireDir = require('require-dir');  requireDir('./gulp/tasks', { recurse: true});

