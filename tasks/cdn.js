var alloy = require('../.alloy');
var gulp = require('gulp');
var insert = require('gulp-insert');
var path = require('path');

var ROOT = path.join(__dirname, '..');

gulp.task('cdn', ['build'], function() {
    var files = [
        'build/aui/aui.js',
        'build/aui/aui-min.js',
        'build/aui/aui-debug.js'
    ];

    return gulp.src(files, { cwd: ROOT })
        .pipe(insert.append('\n' +
            'YUI_config = {' +
                'combine:true,' +
                'comboBase:"http://cdn.alloyui.com/combo/combo.php?",' +
                'filter:"min",' +
                'root:"../' + alloy.version + '/"' +
            '};'))
        .pipe(gulp.dest('build/aui/', { cwd: ROOT }));
});