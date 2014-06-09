var alloy = require('../.alloy');
var gulp = require('gulp');
var spawn = require('spawn-local-bin');

gulp.task('watch', function() {
    var args = [];
    var cmd = 'shifter';

    args.push('--replace-version=' + alloy.version);
    args.push('--replace-yuivar=A');
    args.push('--watch');

    spawn(cmd, args)
        .on('exit', function() {
            callback();
        });
});