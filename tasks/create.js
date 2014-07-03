var gulp = require('gulp');
var prompt = require('gulp-prompt');
var spawn = require('spawn-local-bin');

function setName(res) {
    exports.name = res.name;

    if (exports.name.indexOf('aui-') !== 0) {
        exports.name = 'aui-' + exports.name;
    }
}

gulp.task('create-name', function() {
    return gulp.src('', { read: false })
        .pipe(prompt.prompt({
            name: 'name',
            type: 'input',
            message: 'Provide a name to your module'
        }, setName));
});

gulp.task('create', ['create-name'], function(callback) {
    var args = ['init', exports.name];
    var cmd = 'yogi';

    spawn(cmd, args)
        .on('exit', function() {
            callback();
        });
});