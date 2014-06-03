var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('coverage', function() {
    var cmd = 'yogi serve';

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});