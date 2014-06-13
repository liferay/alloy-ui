var gulp = require('gulp');
var path = require('path');
var run = require('run-sequence');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('init', function(callback) {
    run('init-bower', 'init-yui', callback);
});

gulp.task('init-bower', function(callback) {
    var args = ['install'];
    var cmd = 'bower';
    var cwd = ROOT;

    spawn(cmd, args, cwd)
        .on('exit', function() {
            callback();
        });
});

gulp.task('init-yui', function() {
    return gulp.src('bower_components/yui3/build/**', { cwd: ROOT })
        .pipe(gulp.dest('build', { cwd: ROOT }));
});