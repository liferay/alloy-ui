var build = require('./build');
var gulp = require('gulp');
var path = require('path');
var run = require('run-sequence');

var ROOT = path.join(__dirname, '..');

gulp.task('watch', function() {
    var files = [
        path.join(ROOT, 'src/**/*.js'),
        path.join('!', ROOT, 'src/aui-base/js/*.js'),
        path.join('!', ROOT, 'src/yui/js/*.js')
    ];

    gulp.watch(files, function(data) {
        var cwd = path.join(path.dirname(data.path), '..');

        build(cwd);
    });

    gulp.watch('src/**/meta/*.json', function() {
        run('build-loader');
    });
});