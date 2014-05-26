var alloy = require('../.alloy');
var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var shell = require('gulp-shell');

gulp.task('api-copy-aui', function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('temp/alloy-ui/src/'));
});

gulp.task('api-copy-yui', function() {
    return gulp.src('bower_components/yui3/src/**/*')
        .pipe(gulp.dest('temp/yui3/src/'));
});

gulp.task('api-watch', function() {
    var cmd = ['yuidoc'];

    cmd.push('src');
    cmd.push('--project-version');
    cmd.push(alloy.version);
    cmd.push('--config');
    cmd.push('bower_components/alloy-apidocs-theme/yuidoc.json');
    cmd.push('--server');

    cmd = cmd.join(' ');

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});

gulp.task('api', ['api-include'], function() {
    var cmd = ['yuidoc'];

    cmd.push('temp');
    cmd.push('--project-version');
    cmd.push(alloy.version);
    cmd.push('--config');
    cmd.push('bower_components/alloy-apidocs-theme/yuidoc.json');
    cmd.push('--outdir');
    cmd.push('api');

    cmd = cmd.join(' ');

    gulp.src('', { read: false })
        .pipe(shell(cmd, {
            ignoreErrors: true
        }));
});

gulp.task('api-include', ['api-copy-aui', 'api-copy-yui'], function() {
    return gulp.src('./temp/alloy-ui/src/**/js/*')
        .pipe(replace(/@include [^\s]+/g, replaceInclude))
        .pipe(gulp.dest('./temp/alloy-ui/src/'));
});

function replaceInclude(token) {
    // Get local path from remote url
    var replacedToken = token.replace(/http:\/\/alloyui.com/g,
        'bower_components/alloyui.com/src/documents');

    // Extract local path
    var remoteUrl = token.split(' ')[1];
    var includeFilePath = replacedToken.split(' ')[1];

    // Read files from alloyui.com
    var includeFileContent = fs.readFileSync(includeFilePath, 'utf8');

    // Wrap content in Markdown markup
    return '@example\n```\n' + includeFileContent + '\n```';
}