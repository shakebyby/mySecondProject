/**
 * Created by wb-sfzy189670 on 2016/6/8.
 */
var gulp=require("gulp");
var uglifycss=require("gulp-uglifycss");
gulp.task("css",function(){
    return gulp.src('./requireDirReset/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 5,
            "uglyComments": true
        }))
        .pipe(gulp.dest('dist/css'))
});