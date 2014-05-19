var gulp = require('gulp');

// -- Format -------------------------------------------------------------------

var cssbeautify = require('gulp-cssbeautify');
var jsprettify = require('gulp-jsbeautifier');

gulp.task('format-css', function() {
    var files = [
        'src/**/*.css',
        '!src/aui-css/css/*.css'
    ];

    return gulp.src(files)
        .pipe(cssbeautify())
        .pipe(gulp.dest('src/'));
});

gulp.task('format-js', function() {
    var files = [
        'src/**/*.js',
        '!src/aui-base/js/aui-aliases.js',
        '!src/aui-base/js/aui-loader.js',
        '!src/yui/js/*.js'
    ];

    return gulp.src(files)
        .pipe(jsprettify({
            config: './.jsbeautifyrc'
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('format', ['format-css', 'format-js']);

// -- Lint ---------------------------------------------------------------------

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function() {
    var files = [
        '*.js',
        'src/**/js/*.js'
    ];

    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// -- Init ---------------------------------------------------------------------

var bower = require('gulp-bower');

gulp.task('init', function() {
    var files = 'bower_components/yui3/build/**';

    return bower()
        .pipe(gulp.src(files))
        .pipe(gulp.dest('build'));
});