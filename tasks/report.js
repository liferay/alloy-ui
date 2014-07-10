var fs = require('fs');
var gulp = require('gulp');
var open = require('open');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;
var ERR_MSG = 'Missing \'coverage\' folder. Please run \'gulp test-coverage\' first.';

gulp.task('report', function (callback) {
    var textReport = path.join(ROOT, 'coverage');

    var args = ['report', '--root', textReport, 'text'];
    var cmd = 'istanbul';

    if (!fs.existsSync(textReport)) {
        callback(ERR_MSG);
        return;
    }

    spawn(cmd, args, CWD)
        .on('exit', callback);
});

gulp.task('report-browser', function (callback) {
    var htmlReport = path.join(ROOT, 'coverage/lcov-report/index.html')

    if (!fs.existsSync(htmlReport)) {
        callback(ERR_MSG);
        return;
    }

    open(htmlReport);
    callback();
});
