var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var zip = require('gulp-zip');

var ROOT = path.join(__dirname, '..');

var files = [
    '**',
    '!bower.json',
    '!bower_components/**',
    '!CONTRIBUTING.md',
    '!gulpfile.js',
    '!node_modules/**',
    '!package.json',
    '!tasks/**'
];

gulp.task('compress', ['build'], function() {
    return gulp.src(files, { cwd: ROOT })
        .pipe(zip('alloy-' + alloy.version + '.zip'))
        .pipe(gulp.dest('.', { cwd: ROOT }));
});

gulp.task('compress-cdn', ['cdn'], function() {
    return gulp.src(files, { cwd: ROOT })
        .pipe(zip('cdn-alloy-' + alloy.version + '.zip'))
        .pipe(gulp.dest('.', { cwd: ROOT }));
});