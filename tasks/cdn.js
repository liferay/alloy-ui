var alloy = require('../.alloy');
var gulp = require('gulp');
var insert = require('gulp-insert');

gulp.task('cdn', ['build'], function() {
    var files = [
        'build/aui/aui.js',
        'build/aui/aui-min.js',
        'build/aui/aui-debug.js'
    ];

    return gulp.src(files)
        .pipe(insert.append('\n' +
            'YUI_config = {' +
                'combine:true,' +
                'comboBase:"http://cdn.alloyui.com/combo/combo.php?",' +
                'filter:"min",' +
                'root:"../' + alloy.version + '/"' +
            '};'))
        .pipe(gulp.dest('build/aui/'));
});