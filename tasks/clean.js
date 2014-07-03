var gulp = require('gulp');
var path = require('path');
var rimraf = require('gulp-rimraf');

var ROOT = path.join(__dirname, '..');

gulp.task('clean-aliases', function() {
    return gulp.src(['src/aui-base/js/aui-aliases.js'], { cwd: ROOT, read: false })
        .pipe(rimraf());
});

gulp.task('clean-api', function() {
    return gulp.src(['api', 'temp'], { cwd: ROOT, read: false })
        .pipe(rimraf());
});

gulp.task('clean-bower', function() {
    return gulp.src('bower_components', { cwd: ROOT, read: false })
        .pipe(rimraf());
});

gulp.task('clean-build', function() {
    return gulp.src('build', { cwd: ROOT, read: false })
        .pipe(rimraf());
});

gulp.task('clean-npm', function() {
    return gulp.src('node_modules', { cwd: ROOT, read: false })
        .pipe(rimraf());
});

gulp.task('clean-zip', function() {
    return gulp.src('*.zip', { cwd: ROOT, read: false })
        .pipe(rimraf());
});