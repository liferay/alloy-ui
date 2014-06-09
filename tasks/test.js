var gulp = require('gulp');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('test', function(callback) {
    var args = ['test'];
    var cmd = 'yogi';

    spawn(cmd, args)
        .on('exit', function() {
            callback();
        });
});

gulp.task('test-browser', function(callback) {
    var args = [];
    var cmd = 'yeti';
    var cwd = process.cwd();

    if (cwd === ROOT) {
        cwd = path.join(cwd, 'src');
    }

    spawn(cmd, args, cwd)
        .on('exit', function() {
            callback();
        });
});