/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'build',
    description: 'Build AlloyUI/YUI using Shifter'
};

// -- Dependencies -------------------------------------------------------------
var async   = require('async');
var command = require('command');
var fs      = require('fs');
var path    = require('path');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerMultiTask(TASK.name, TASK.description, function() {
        var done   = this.async();
        var target = this.target;
        var isYuiBuildUpdated = false;

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback, target);
            },
            function(mainCallback) {
                // Force YUI build
                // $ grunt build:yui
                if (process.argv[2].indexOf('yui') !== -1) {
                    mainCallback();
                }
                // Check if YUI build is updated and skip to AUI build if necessary
                // $ grunt build
                else {
                    exports._checkYuiCache(function(val) {
                        isYuiBuildUpdated = val;
                        mainCallback();
                    }, target);
                }
            },
            function(mainCallback) {
                exports._setShifterArgs(mainCallback, target, isYuiBuildUpdated);
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

    exports._checkYuiCache = function(mainCallback, target) {
        var cwd           = grunt.config([TASK.name, target, 'src']);
        var yuiRoot       = path.join(cwd, '..');
        var yuiCacheFile  = path.join(ROOT, 'build/.yui-build');
        var isYuiBuildUpdated = false;

        if (grunt.file.exists(yuiCacheFile)) {
            command.open(yuiRoot)
                .exec('git', ['rev-parse', 'HEAD'])
                .then(function() {
                    var yuiCurrentGitHash = this.lastOutput.stdout.trim();
                    var yuiCachedGitHash  = fs.readFileSync(yuiCacheFile)
                                                .toString().trim();

                    if (yuiCurrentGitHash === yuiCachedGitHash) {
                        isYuiBuildUpdated = true;
                    }

                    mainCallback(isYuiBuildUpdated);
                });
        }
        else {
            mainCallback(isYuiBuildUpdated);
        }
    };

    exports._setShifterArgs = function(mainCallback, target, isYuiBuildUpdated) {
        var args  = [];
        var stack = [];
        var cwd   = grunt.config([TASK.name, target, 'src']);

        // Build Dir
        args.push('--build-dir=' + grunt.config([TASK.name, target, 'dist']));

        // Cache
        if (grunt.config([TASK.name, target, 'cache'])) {
            args.push('--cache');
        }
        else {
            args.push('--no-cache');
        }

        // Coverage
        if (grunt.config([TASK.name, target, 'coverage'])) {
            args.push('--coverage');
        }
        else {
            args.push('--no-coverage');
        }

        // Lint
        if (grunt.config([TASK.name, target, 'lint'])) {
            args.push('--lint');
        }
        else {
            args.push('--no-lint');
        }

        // Replace YUI var
        args.push(
            '--replace-yuivar=' +
            grunt.config([TASK.name, target, 'replace-yuivar']));

        // Replace version
        args.push(
            '--replace-version=' +
            grunt.config([TASK.name, target, 'replace-version']));

        // Source Dir
        if (target === 'aui') {
            var auiSrcDir  = path.join(ROOT, 'src');
            var auiBaseDir = path.join(auiSrcDir, 'aui-base');

            if (cwd === ROOT || cwd === auiSrcDir) {
                args.push('--walk');

                stack.push(function(mainCallback) {
                    exports._runShifter(mainCallback, target, args, auiSrcDir);
                });
            }
            else {
                stack.push(function(mainCallback) {
                    exports._runShifter(mainCallback, target, args, auiBaseDir);
                });

                stack.push(function(mainCallback) {
                    exports._runShifter(mainCallback, target, args, cwd);
                });
            }
        }
        else if (target === 'yui') {
            if (isYuiBuildUpdated) {
                grunt.log.ok('YUI build is up to date.');
            }
            else {
                args.push('--walk');

                stack.push(function(mainCallback) {
                    exports._runShifter(mainCallback, target, args, cwd);
                });
            }
        }

        async.parallel(stack, function() {
            mainCallback();
        });
    };

    exports._runShifter = function(mainCallback, target, args, cwd) {
        command.open(cwd)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('shifter', args)
            .then(function() {
                if (target === 'yui') {
                    exports._setYuiCache(mainCallback, target);
                }
                else {
                    mainCallback();
                }
            });
    };

    exports._setYuiCache = function(mainCallback, target) {
        var cwd          = grunt.config([TASK.name, target, 'src']);
        var yuiRoot      = path.join(cwd, '..');
        var yuiCacheFile = path.join(ROOT, 'build/.yui-build');

        command.open(yuiRoot)
            .exec('git', ['rev-parse', 'HEAD'])
            .then(function() {
                var yuiCurrentGitHash = this.lastOutput.stdout.trim();

                fs.writeFileSync(yuiCacheFile, yuiCurrentGitHash);

                mainCallback();
            });
    };
};