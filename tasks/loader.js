var alloy = require('../.alloy');
var gulp = require('gulp');
var insert = require('gulp-insert');
var path = require('path');
var replace = require('gulp-replace');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('loader-prebuild', function(callback) {
    var args = [];
    var cmd = 'yogi';
    var cwd = path.join(ROOT, 'src/aui-base');

    args.push('loader');
    args.push('--yes');
    args.push('--mix');
    args.push('--js');
    args.push('js/aui-loader.js');
    args.push('--json');
    args.push('js/aui-loader.json');
    args.push('--start');
    args.push('../');

    spawn(cmd, args, cwd)
        .on('exit', function() {
            callback();
        });
});

gulp.task('loader-postbuild', function() {
    return gulp.src('build/aui/*.js', { cwd: ROOT })
        .pipe(replace(/\(yui\(/g, '(aui|yui('))
        .pipe(insert.append('YUI.Env.core.push.apply(YUI.Env.core, ["aui-base-core"]);'))
        .pipe(gulp.dest('build/aui/', { cwd: ROOT }));
});