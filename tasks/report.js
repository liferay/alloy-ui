var gulp = require('gulp');
var open = require('open');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;

gulp.task('report', function (callback) {
    var coverDir = path.join(ROOT, 'coverage');
    var args = ['report', '--root', coverDir, 'text'];
    var cmd = path.join(ROOT, 'node_modules/.bin/istanbul');

    spawn(cmd, args, CWD)
        .on('exit', callback);
});

gulp.task('report-html', function (callback) {
    open(path.join(ROOT, 'coverage/lcov-report/index.html'));
    callback();
});
