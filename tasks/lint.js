var gulp = require('gulp');
var jshint = require('gulp-jshint');
var path = require('path');
var stylish = require('jshint-stylish');

var ROOT = path.join(__dirname, '..');

gulp.task('lint', function() {
    var files = [
        '*.js',
        'src/**/js/*.js',
        '!gulpfile.js',
        '!src/aui-base/js/aui-aliases.js',
        '!src/aui-base/js/aui-loader.js',
        '!src/yui/js/load-tests.js'
    ];

    return gulp.src(files, { cwd: ROOT })
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});