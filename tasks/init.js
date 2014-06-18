var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('init-bower', function() {
    var cmd = 'bower install';

    return gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});

gulp.task('init', ['init-bower'], function() {
    var files = 'bower_components/yui3/build/**';

    return gulp.src(files)
        .pipe(gulp.dest('build'));
});