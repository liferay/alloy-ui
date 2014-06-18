var alloy = require('../.alloy');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var replace = require('gulp-replace');
var run = require('run-sequence');
var spawn = require('spawn-local-bin');

var ROOT = path.join(__dirname, '..');

gulp.task('api', ['api-include'], function(callback) {
    var args = [];
    var cmd = 'yuidoc';
    var cwd = ROOT;

    args.push('temp');
    args.push('--project-version');
    args.push(alloy.version);
    args.push('--config');
    args.push('bower_components/alloy-apidocs-theme/yuidoc.json');
    args.push('--outdir');
    args.push('api');

    spawn(cmd, args, cwd)
        .on('exit', callback);
});

gulp.task('api-copy', function(callback) {
    run('init', 'clean-api', ['api-copy-aui', 'api-copy-yui'], callback);
});

gulp.task('api-copy-aui', function() {
    return gulp.src('src/**/*', { cwd: ROOT })
        .pipe(gulp.dest('temp/alloy-ui/src/', { cwd: ROOT }));
});

gulp.task('api-copy-yui', function() {
    return gulp.src('bower_components/yui3/src/**/*', { cwd: ROOT })
        .pipe(gulp.dest('temp/yui3/src/', { cwd: ROOT }));
});

gulp.task('api-include', ['api-copy'], function() {
    return gulp.src('temp/alloy-ui/src/**/js/*', { cwd: ROOT })
        .pipe(replace(/@include [^\s]+/g, replaceInclude))
        .pipe(gulp.dest('temp/alloy-ui/src/', { cwd: ROOT }));
});

gulp.task('api-watch', ['init-bower'], function(callback) {
    var args = [];
    var cmd = 'yuidoc';
    var cwd = ROOT;

    args.push('src');
    args.push('--project-version');
    args.push(alloy.version);
    args.push('--config');
    args.push('bower_components/alloy-apidocs-theme/yuidoc.json');
    args.push('--server');

    spawn(cmd, args, cwd)
        .on('exit', callback);
});

function replaceInclude(token) {
    // Get local path from remote url
    var replacedToken = token.replace(/http:\/\/alloyui.com/g,
        path.join(ROOT, 'bower_components/alloyui.com/src/documents'));

    // Extract local path
    var includeFilePath = replacedToken.split(' ')[1];

    // Read files from alloyui.com
    var includeFileContent = fs.readFileSync(includeFilePath, 'utf8');

    // Wrap content in Markdown markup
    return '@example\n```\n' + includeFileContent + '\n```';
}