// //导入工具包 require('node_modules里对应模块')
// var gulp = require('gulp'), //本地安装gulp所用到的地方
//     less = require('gulp-less'),
//     watch=require("gulp-watch");
//
// //定义一个testLess任务（自定义任务名称）
// gulp.task('testLess', function () {
//     gulp.src('src/less/*.less') //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('bulid/css')); //将会在src/css下生成index.css
// });
//
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
//requireDir构建方法
var requireDir = require('require-dir');  requireDir('./gulp/tasks', { recurse: true});
