var gulp = require('gulp');
var shell = require('gulp-shell');
var spawn = require('child_process').spawn;

gulp.task('test', function() {
    var cmd = 'yogi test';

    return gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});

gulp.task('test-browser', function(callback) {
    var cmd = spawn('yeti', {
        stdio: 'inherit'
    });

    cmd.on('close', function() {
        callback();
    });
});