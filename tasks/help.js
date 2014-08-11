var gulp = require('gulp');
var gutil = require('gulp-util');
var project = require('../bower.json');

var yui3version = project.dependencies.yui3;
var header;
var content;
var footer;

yui3version = yui3version.substr(yui3version.indexOf('#') + 1);

header = '\n' + gutil.colors.underline('Usage') + '\n  gulp <command>\n\n' +
    'The most commonly used AlloyUI tasks are:';

footer = 'AlloyUI ' + gutil.colors.green(project.version) + '\n' +
    'YUI3 ' + gutil.colors.green(yui3version);

content = {
    'api': 'Import code examples and build docs locally using YUIDoc',
    'api-watch': 'Watch for any changes and build docs locally using YUIDoc',
    'build': 'Build AlloyUI & YUI3 using Shifter',
    'create': 'Create a new module under src folder using Yogi',
    'format': 'Format CSS & JavaScript code & images',
    'format-css': 'Format only CSS code using CSS Beautify',
    'format-js': 'Format only JavaScript code using JS Beautify',
    'init': 'Fetch dependencies, then copy YUI3 files to build folder',
    'init-bower': 'Fetch dependencies using Bower',
    'init-npm': 'Fetch dependencies using NPM',
    'init-yui': 'Copy YUI3 files to the build folder',
    'lint': 'Lint JavaScript code using JSHint',
    'release': 'Build modules and generate a release zip file',
    'release-cdn': 'Build modules optimized for CDN and generate a release',
    'report': 'Show code coverage summary using Istanbul',
    'report-browser': 'Open code coverage report in the browser',
    'test': 'Run unit tests using PhantomJS',
    'test-browser': 'Run tests in the browser using Yeti',
    'test-coverage': 'Run test coverage using Yogi',
    'test-coverage-watch': 'Watch for any changes and run test coverage',
    'update': 'Update dependencies using Bower and NPM',
    'watch': 'Watch for any changes and build using Shifter'
};

function help(callback) {
    var output = '';
    var spacing = 0;
    var methods;

    methods = Object.keys(content).sort(function (a, b) {
        return a.localeCompare(b);
    });

    methods.forEach(function(item) {
        if (spacing < item.length) {
            spacing = item.length + 3;
        }
    });

    methods.forEach(function(item) {
        output += '  ' + gutil.colors.cyan(item) +
            new Array(spacing - item.length + 1).join(" ") +
            content[item] + '\n';
    });

    console.log(header + '\n' + output + '\n' + footer);
    callback();
}

gulp.task('default', help);
gulp.task('help', help);
