var requireDir = require('require-dir');
var tasksDir = requireDir('./tasks');

// Add the node_modules/.bin directory to the PATH
require('spawn-local-bin').path(__dirname);