var alloy = require('../.alloy');
var gulp = require('gulp');
var insert = require('gulp-insert');
var path = require('path');

var ROOT = path.join(__dirname, '..');

gulp.task('cdn', ['build'], function() {
    return gulp.src('build/aui/*.js', { cwd: ROOT })
        .pipe(insert.append('\n' +
            'YUI_config = {' +
                'combine:true,' +
                'comboBase:"http://cdn.alloyui.com/combo/combo.php?",' +
                'filter:"min",' +
                'root:"../' + alloy.version + '/"' +
            '};'))
        .pipe(gulp.dest('build/aui/', { cwd: ROOT }));
});