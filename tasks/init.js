var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('init', function() {
    var files = 'bower_components/yui3/build/**';

    return bower()
        .pipe(gulp.src(files))
        .pipe(gulp.dest('build'));
});