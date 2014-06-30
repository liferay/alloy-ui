var alloy = require('../.alloy');
var gulp = require('gulp');
var path = require('path');
var spawn = require('child_process').spawn;
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

gulp.task('compress', ['build'], function(callback) {
    getSHA(function(zipComment) {
        gulp.src(files, { cwd: ROOT })
            .pipe(zip('alloy-' + alloy.version + '.zip', {
                comment: zipComment
            }))
            .pipe(gulp.dest('.', { cwd: ROOT }))
            .on('end', callback);
    });
});

gulp.task('compress-cdn', ['cdn'], function(callback) {
    getSHA(function(zipComment) {
        gulp.src(files, { cwd: ROOT })
            .pipe(zip('cdn-alloy-' + alloy.version + '.zip', {
                comment: zipComment
            }))
            .pipe(gulp.dest('.', { cwd: ROOT }))
            .on('end', callback);
    });
});

function getSHA(callback) {
    var stdout = '';

    var child = spawn('git', ['rev-parse', 'HEAD'], {
        cwd: ROOT
    });

    child.stdout.on('data', function(data) {
        stdout += data.toString();
    });

    child.on('exit', function(data) {
        var msg = 'SHA: ' + stdout.trim() + ' on ' + new Date();
        callback(msg);
    });
}