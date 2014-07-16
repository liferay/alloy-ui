var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var report = require('./report');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;

function normalizeCwd(cwd) {
    if (cwd.substr(-11) === '/tests/unit') {
        return cwd.substr(0, cwd.length - 11);
    }

    if (cwd.substr(-6) === '/tests') {
        return cwd.substr(0, cwd.length - 6);
    }

    return cwd;
}

gulp.task('test', function(callback) {
    var args = ['test'];
    var cmd = 'yogi';

    spawn(cmd, args, CWD)
        .on('exit', callback);
});

function testCoverage(cwd, callback) {
    var args = ['test', '--coverage',
        '--coverdir', path.join(ROOT, 'coverage')];
    var cmd = 'yogi';

    spawn(cmd, args, CWD)
        .on('exit', function(err) {
            if (err === 0) {
                gutil.log('See results with ' +
                    gutil.colors.yellow('gulp report') + ' or ' +
                    gutil.colors.yellow('gulp report-browser'));
            }

            if (callback) {
                callback(err);
            }
        });
}

gulp.task('test-coverage', function(callback) {
    testCoverage(CWD, callback);
});

gulp.task('test-coverage-watch', function() {
    var files = [
        path.join(ROOT, 'src/**/*.js'),
        path.join('!', ROOT, 'src/aui-base/js/*.js'),
        path.join('!', ROOT, 'src/yui/js/*.js')
    ];

    gulp.watch(files, function(data) {
        var cwd = normalizeCwd(path.join(path.dirname(data.path), '..'));

        testCoverage(cwd, function (err) {
            if (err === 0) {
                report();
            }
        });
    });
});

gulp.task('test-browser', function(callback) {
    var args = [];
    var cmd = 'yeti';

    if (CWD === ROOT) {
        CWD = path.join(CWD, 'src');
    }

    spawn(cmd, args, CWD)
        .on('exit', callback);
});
