var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var shell = require('gulp-shell');

gulp.task('build', ['init'], function() {
    var cmd = ['shifter'];
    var cwd = process.cwd();
    var root = path.join(__dirname, '..');

    if (cwd === root) {
        cwd = path.join(cwd, 'src');
    }

    cmd.push('--build-dir=' + path.join(root, 'build'));
    cmd.push('--no-cache');
    cmd.push('--no-coverage');
    cmd.push('--no-istanbul');
    cmd.push('--no-lint');
    cmd.push('--replace-version=' + alloy.version);
    cmd.push('--replace-yuivar=A');
    cmd.push('--walk');

    cmd = cmd.join(' ');

    return gulp.src('', { read: false })
        .pipe(shell(cmd, {
            cwd: cwd,
            ignoreErrors: true,
        }));
});