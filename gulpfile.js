// -- Require ------------------------------------------------------------------
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// -- Lint ---------------------------------------------------------------------
gulp.task('lint', function() {
    return gulp.src(['*.js', 'src/**/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});