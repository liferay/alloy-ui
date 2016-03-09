var options = {
    artifactName: 'alloy-ui',
    artifactSrc: ['**/*', '!node_modules/', '!node_modules/**', '!bower_components/', '!bower_components/**']
};

var gulp = require('liferay-gulp-tasks')(require('gulp'), options);
var requireDir = require('require-dir');
var tasksDir = requireDir('./tasks');

// Add the node_modules/.bin directory to the PATH
require('spawn-local-bin').path(__dirname);
