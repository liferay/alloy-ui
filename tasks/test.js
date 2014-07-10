var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');
var CWD = process.env.INIT_CWD;

gulp.task('test', function(callback) {
    var args = ['test'];
    var cmd = 'yogi';

    spawn(cmd, args, CWD)
        .on('exit', callback);
});

gulp.task('test-coverage', function(callback) {
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

            callback(err);
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
