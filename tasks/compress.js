var alloy = require('../.alloy');
var gulp = require('gulp');
var zip = require('gulp-zip');

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
    return gulp.src(files)
        .pipe(zip('alloy-' + alloy.version + '.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('compress-cdn', ['cdn'], function() {
    return gulp.src(files)
        .pipe(zip('cdn-alloy-' + alloy.version + '.zip'))
        .pipe(gulp.dest('.'));
});