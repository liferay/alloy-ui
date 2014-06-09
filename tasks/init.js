var gulp = require('gulp');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('init-bower', function(callback) {
    var args = ['install'];
    var cmd = 'bower';
    var cwd = ROOT;

    spawn(cmd, args, cwd)
        .on('exit', function() {
            callback();
        });
});

gulp.task('init', ['init-bower'], function() {
    return gulp.src('bower_components/yui3/build/**', { cwd: ROOT })
        .pipe(gulp.dest('build', { cwd: ROOT }));
});