var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var shell = require('gulp-shell');

gulp.task('build', function() {
    var cmd = ['shifter'];
    var cwd = process.cwd();

    if (path.basename(cwd) === 'alloy-ui') {
        cwd = path.join(cwd, 'src');
    }

    cmd.push('--build-dir=build');
    cmd.push('--no-cache');
    cmd.push('--no-coverage');
    cmd.push('--no-istanbul');
    cmd.push('--no-lint');
    cmd.push('--replace-version=' + alloy.version);
    cmd.push('--replace-yuivar=A');
    cmd.push('--walk');

    cmd = cmd.join(' ');

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            cwd: cwd,
            ignoreErrors: true,
        }));
});