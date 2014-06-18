var cssbeautify = require('gulp-cssbeautify');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jsprettify = require('gulp-jsbeautifier');
var path = require('path');
var pngcrush = require('imagemin-pngcrush');

var ROOT = path.join(__dirname, '..');

gulp.task('format-css', function() {
    var files = [
        'src/**/*.css',
        '!src/aui-css/css/*.css'
    ];

    return gulp.src(files, { cwd: ROOT })
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.join(ROOT, 'src/')));
});

gulp.task('format-js', function() {
    var configFile = path.join(ROOT, '.jsbeautifyrc');
    var files = [
        'src/**/*.js',
        '!build/**/*.js',
        '!src/aui-base/js/aui-aliases.js',
        '!src/aui-base/js/aui-loader.js',
        '!src/yui/js/*.js'
    ];

    return gulp.src(files, { cwd: ROOT })
        .pipe(jsprettify({
            config: configFile
        }))
        .pipe(gulp.dest(path.join(ROOT, 'src/')));
});

gulp.task('format-img', function() {
    return gulp.src('src/**/*.png', { cwd: ROOT })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(path.join(ROOT, 'src/')));
});

gulp.task('format', ['format-css', 'format-js', 'format-img']);