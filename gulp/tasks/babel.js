/**
 * Created by wb-sfzy189670 on 2016/6/12.
 */
var gulp = require('gulp');
var matchRex = /(src.*)\/.*\.*/;
var babel = require('gulp-babel');
var babelTask = function(e) {
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file = match[0];
    gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'react'] } ).on('error', function(e) {
                console.error('error', e.message);
}) )
.pipe(gulp.dest( match[1] ));
};
gulp.task('watch-jsx', function() {
    // babel & jsx
    gulp.watch(['src/**/*.jsx', 'src/**/*.es6']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
    babelTask(event);
    });
});

