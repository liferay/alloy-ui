var gulp = require('gulp');
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

gulp.task('test-browser', function(callback) {
    var args = [];
    var cmd = 'yeti';

    if (CWD === ROOT) {
        CWD = path.join(CWD, 'src');
    }

    spawn(cmd, args, CWD)
        .on('exit', callback);
});
