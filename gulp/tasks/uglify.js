/**
 * Created by wb-sfzy189670 on 2016/6/8.
 */
var gulp=require("gulp");
var uglify=require("gulp-uglify");
gulp.task('compress', function() {
    return gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});