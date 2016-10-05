var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var run = require('run-sequence');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;

gulp.task('build', function(callback) {
    var BASE_DIR = path.join(ROOT, 'src/aui-base');

    if (CWD === BASE_DIR) {
        run('init', 'build-loader', callback);
    }
    else {
        run('init', 'build-aui', 'build-loader', callback);
    }
});

gulp.task('build-aui', function(callback) {
    if (CWD === ROOT) {
        CWD = path.join(CWD, 'src');
    }

    build(CWD, callback);
});

gulp.task('build-base', function(callback) {
    var cwd = path.join(ROOT, 'src/aui-base');

    build(cwd, callback);
});

gulp.task('build-loader', function(callback) {
    run('loader-prebuild', 'aliases', 'build-base', 'loader-postbuild', callback);
});

gulp.task('build-publish', function(callback) {
    run('init-yui', 'build-aui', 'build-loader', callback);
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
            if (callback) {
                callback();
            }
        });
}

module.exports = build;
