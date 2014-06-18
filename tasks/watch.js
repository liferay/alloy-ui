var alloy = require('../.alloy');
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('watch', function() {
    var cmd = ['shifter'];

    cmd.push('--replace-version=' + alloy.version);
    cmd.push('--replace-yuivar=A');
    cmd.push('--watch');

    cmd = cmd.join(' ');

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});