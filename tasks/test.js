var gulp = require('gulp');
var nopt = require('nopt');
var shell = require('gulp-shell');

gulp.task('test', function() {
    var cmd = ['yogi'];
    var args = nopt(process.argv).argv.cooked;

    cmd = cmd.concat(args).join(' ');

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});