var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('build', ['init'], function(callback) {
    var args = [];
    var cmd = 'shifter';
    var cwd = process.cwd();

    if (cwd === ROOT) {
        cwd = path.join(cwd, 'src');
    }

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
});