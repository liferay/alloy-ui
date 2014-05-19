// -- Require ------------------------------------------------------------------
var gulp = require('gulp');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// -- Lint ---------------------------------------------------------------------
gulp.task('lint', function() {
    return gulp.src(['*.js', 'src/**/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// -- Init ---------------------------------------------------------------------
gulp.task('init', function() {
    return bower()
        .pipe(gulp.src('bower_components/yui3/build/**'))
        .pipe(gulp.dest('build'))
});