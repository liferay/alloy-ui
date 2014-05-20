var gulp = require('gulp');
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