/**
 * Created by wb-sfzy189670 on 2016/6/12.
 */
var gulp=require("gulp");
var imagemin=require("gulp-imagemin");
gulp.task('image-min',function(){
   return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});