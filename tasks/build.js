var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var run = require('run-sequence');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('build', function(callback) {
    var cwd = process.cwd();
    var baseDir = path.join(ROOT, 'src/aui-base');

    if (cwd === baseDir) {
        run('init', 'build-loader', callback);
    }
    else {
        run('init', 'build-aui', 'build-loader', callback);
    }
});

gulp.task('build-aui', function(callback) {
    var cwd = process.cwd();

    if (cwd === ROOT) {
        cwd = path.join(cwd, 'src');
    }

    build(cwd, callback);
});

gulp.task('build-base', function(callback) {
    var cwd = path.join(ROOT, 'src/aui-base');

    build(cwd, callback);
});

gulp.task('build-loader', function(callback) {
    var cwd = process.cwd();

    run('loader-prebuild', 'aliases', 'build-base', 'loader-postbuild', callback);
});

function build(cwd, callback) {
    var args = [];
    var cmd = 'shifter';

    args.push('--build-dir=' + path.join(ROOT, 'build'));
    args.push('--no-cache');
    args.push('--no-lint');
    args.push('--replace-version=' + alloy.version);
    args.push('--replace-yuivar=A');
    args.push('--walk');

    spawn(cmd, args, cwd)
        .on('exit', function() {
            callback();
        });
}