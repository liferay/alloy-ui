var gulp = require('gulp');
var prompt = require('gulp-prompt');
var spawn = require('child_process').spawn;

var name;

function setName(res) {
    name = res.name;

    if (name.indexOf('aui-') !== 0) {
        name = 'aui-' + name;
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
    var cmd = spawn('yogi', ['init', name], {
        stdio: 'inherit'
    });

    cmd.on('close', function() {
        callback();
    });
});