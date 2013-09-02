/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'init',
    description: 'Clone or update dependencies.'
};

// -- Dependencies -------------------------------------------------------------
var async   = require('async');
var command = require('command');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                exports._initDependencies(mainCallback);
            }],
            function(err) {
                if (err) {
                    done(false);
                }
                else {
                    done();
                }
            }
        );
    });

    exports._setGruntConfig = function(mainCallback) {
        var options = grunt.option.flags();

        options.forEach(function(option) {
            var key;
            var value;
            var valueIndex;

            // Normalize option
            option = option.replace(/^--(no-)?/, '');

            valueIndex = option.lastIndexOf('=');

            // String parameter
            if (valueIndex !== -1) {
                key   = option.substring(0, valueIndex);
                value = option.substring(valueIndex + 1);
            }
            // Boolean parameter
            else {
                key   = option;
                value = grunt.option(key);
            }

            grunt.config([TASK.name, key], value);
        });

        mainCallback();
    };

    exports._initDependencies = function(mainCallback) {
        var dependencies = grunt.config([TASK.name, 'dependencies']);
        var dependencyName;
        var stack = [];

        for (dependencyName in dependencies) {
            var dependency = dependencies[dependencyName];

            // Wraps in a closure to hold dependency reference
            (function(dependency) {
                if (grunt.file.exists(dependency.folder)) {
                    stack.push(function(depCallback) {
                        exports._updateDependency(dependency, depCallback);
                    });
                }
                else {
                    stack.push(function(depCallback) {
                        exports._cloneDependency(dependency, depCallback);
                    });
                }
            })(dependency);
        }

        async.parallel(stack, function() {
            mainCallback();
        });
    };

    exports._updateDependency = function(dependency, depCallback) {
        grunt.log.ok('Updating: ' + dependency.repo +
                ' [' + dependency.version + ']');

        async.series([
            function(mainCallback) {
                command.open(ROOT)
                    .on('stdout', command.writeTo(process.stdout))
                    .on('stderr', command.writeTo(process.stderr))
                    .exec('git', ['fetch', dependency.repo, dependency.version, '--progress'], { cwd: dependency.folder })
                    .then(function() {
                        mainCallback();
                    });
            },
            function(mainCallback) {
                command.open(ROOT)
                    .on('stdout', command.writeTo(process.stdout))
                    .on('stderr', command.writeTo(process.stderr))
                    .exec('git', ['checkout', dependency.version, '-f'], { cwd: dependency.folder })
                    .then(function() {
                        mainCallback();
                    });
            },
            function(mainCallback) {
                command.open(ROOT)
                    .on('stdout', command.writeTo(process.stdout))
                    .on('stderr', command.writeTo(process.stderr))
                    .exec('git', ['pull', '--rebase', dependency.repo, dependency.version, '--progress'], { cwd: dependency.folder })
                    .then(function() {
                        mainCallback();
                    });
            }],
            function() {
                depCallback();
            }
        );
    };

    exports._cloneDependency = function(dependency, depCallback) {
        grunt.log.ok('Cloning: ' + dependency.repo +
                ' [' + dependency.version + ']');

        command.open(ROOT)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('git', ['clone', dependency.repo, '-b', dependency.version, dependency.folder, '--progress'], { cwd: ROOT })
            .then(function() {
                depCallback();
            });
    };
};