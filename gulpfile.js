var liferayGulpTasks = require('liferay-gulp-tasks');
var requireDir = require('require-dir');
var tasksDir = requireDir('./tasks');

liferayGulpTasks.registerTasks({
	artifactSrc: ['**/*', '!node_modules/', '!node_modules/**', '!bower_components/', '!bower_components/**']
});

// Add the node_modules/.bin directory to the PATH
require('spawn-local-bin').path(__dirname);
