/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'api-push',
    description: 'Push folder into a certain branch.'
};

// -- Dependencies -------------------------------------------------------------
var async   = require('async');
var command = require('command');
var fs      = require('fs-extra');
var path    = require('path');

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                grunt.log.ok('Move folder');
                exports._moveFolder(mainCallback);
            },
            function(mainCallback) {
                grunt.log.ok('Go to branch');
                exports._gitGoToBranch(mainCallback);
            },
            function(mainCallback) {
                grunt.log.ok('Add folder');
                exports._gitAddFolder(mainCallback);
            },
            function(mainCallback) {
                grunt.log.ok('Commit changes');
                exports._gitCommit(mainCallback);
            },
            function(mainCallback) {
                grunt.log.ok('Push changes');
                exports._gitPushToBranch(mainCallback);
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

    exports._moveFolder = function(mainCallback) {
        var src  = grunt.config([TASK.name, 'src']);
        var dist = grunt.config([TASK.name, 'dist']);

        fs.copy(src, dist, function(err) {
            if (err) {
                mainCallback(err);
            }
            else {
                fs.remove(src, function(err) {
                    if (err) {
                        mainCallback(err);
                    }
                    else {
                        mainCallback();
                    }
                });
            }
        });
    };

    exports._gitGoToBranch = function(mainCallback) {
        var branch = grunt.config([TASK.name, 'branch']);
        var repo   = grunt.config([TASK.name, 'repo']);

        command.open(repo)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('git', ['checkout', branch])
            .then(function() {
                mainCallback();
            });
    };

    exports._gitAddFolder = function(mainCallback) {
        var dist = grunt.config([TASK.name, 'dist']);
        var repo = grunt.config([TASK.name, 'repo']);

        command.open(repo)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('git', ['add', dist])
            .then(function() {
                mainCallback();
            });
    };

    exports._gitCommit = function(mainCallback) {
        var repo = grunt.config([TASK.name, 'repo']);

        command.open(repo)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('git', ['commit', '-m', 'Regenerate API Docs'])
            .then(function() {
                mainCallback();
            });
    };

    exports._gitPushToBranch = function(mainCallback) {
        var branch = grunt.config([TASK.name, 'branch']);
        var repo   = grunt.config([TASK.name, 'repo']);
        var remote = grunt.config([TASK.name, 'remote']);

        command.open(repo)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('git', ['push', remote, branch])
            .then(function() {
                mainCallback();
            });
    };
};