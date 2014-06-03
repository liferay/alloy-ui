var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function() {
    var files = [
        '*.js',
        'src/**/js/*.js',
        '!gulpfile.js',
        '!**/aui-aliases.js',
        '!**/aui-loader.js',
        '!**/load-tests.js'
    ];

    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});