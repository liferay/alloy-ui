var fs = require('fs');
var gulp = require('gulp');
var open = require('open');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;
var ERR_MSG = 'Missing \'coverage\' folder. Please run \'gulp test-coverage\' first.';

function report(callback) {
    var textReport = path.join(ROOT, 'coverage');

    var args = ['report', '--root', textReport, 'text'];
    var cmd = 'istanbul';
    var proc;

    if (!fs.existsSync(textReport)) {
        if (callback) {
            callback(ERR_MSG);
        }

        return;
    }

    proc = spawn(cmd, args, CWD);

    if (callback) {
        proc.on('exit', callback);
    }
}

gulp.task('report', function (callback) {
    report(callback);
});

gulp.task('report-browser', function (callback) {
    var htmlReport = path.join(ROOT, 'coverage/lcov-report/index.html');

    if (!fs.existsSync(htmlReport)) {
        callback(ERR_MSG);
        return;
    }

    open(htmlReport);
    callback();
});

module.exports = report;
