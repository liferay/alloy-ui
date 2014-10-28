var del = require('del');
var gulp = require('gulp');

gulp.task('clean-aliases', function(callback) {
    del(['src/aui-base/js/aui-aliases.js'], callback);
});

gulp.task('clean-api', function(callback) {
    del(['api'], callback);
});

gulp.task('clean-bower', function(callback) {
    del(['bower_components'], callback);
});

gulp.task('clean-build', function(callback) {
    del(['build'], callback);
});

gulp.task('clean-npm', function(callback) {
    del(['node_modules'], callback);
});

gulp.task('clean-zip', function(callback) {
    del(['*.zip'], callback);
});