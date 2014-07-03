var gulp = require('gulp');
var run = require('run-sequence');

gulp.task('update', function(callback) {
    run(['clean-bower', 'clean-npm'], ['init-bower', 'init-npm'], callback);
});