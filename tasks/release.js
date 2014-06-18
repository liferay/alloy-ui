var gulp = require('gulp');
var run = require('run-sequence');

gulp.task('release', function(callback) {
    run(['clean-build', 'clean-zip'], 'compress', callback);
});

gulp.task('release-cdn', function(callback) {
    run(['clean-build', 'clean-zip'], 'compress-cdn', callback);
});