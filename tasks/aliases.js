var file = require('gulp-file');
var gulp = require('gulp');
var path = require('path');

var ROOT = path.join(__dirname, '..');

gulp.task('aliases', ['clean-aliases'], function() {
    return gulp.src('src/aui-base/js/aui-aliases.js', { cwd: ROOT })
        .pipe(file('aui-aliases.js', getContent()))
        .pipe(gulp.dest('src/aui-base/js/', { cwd: ROOT }));
});

function getContent() {
    var metaPath = path.join(ROOT, 'src/aui-base/js/aui-loader.json');
    var metaContent = require(metaPath);
    var meta = {};

    Object.keys(metaContent).sort().forEach(function(moduleName) {
        if (moduleName === 'yui') {
            return;
        }

        if (metaContent[moduleName].use) {
            meta[moduleName] = {
                use: metaContent[moduleName].use
            };
        }
    });

    var modules = Object.keys(meta);
    var buffer = [];
    var content = 'var Y = A;\n';

    if (modules.length) {
        modules.forEach(function(moduleName) {
            var module = meta[moduleName];
            buffer.push('    "' + moduleName + '": ' + JSON.stringify(module.use));
        });

        content += 'YUI.Env.aliases = YUI.Env.aliases || {};\n';
        content += 'Y.mix(YUI.Env.aliases, {\n';
        content += buffer.join(',\n');
        content += '\n});\n';
    }

    return content;
}