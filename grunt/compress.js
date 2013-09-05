/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'compress',
    description: 'Generate a zip from build, demos and src folders.'
};

// -- Dependencies -------------------------------------------------------------
var async       = require('async');
var command     = require('command');
var fs          = require('fs');
var path        = require('path');
var walkdir     = require('walkdir');
var zipArchiver = require('zip-archiver').Zip;

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();
        var baseFileName;
        var sha;
        var zipFileName;

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                exports._getCurrentGitHashCommit(function(val) {
                    sha = val;
                    mainCallback();
                });
            },
            function(mainCallback) {
                baseFileName = grunt.config([TASK.name, 'name']);
                zipFileName  = baseFileName + '.zip';

                exports._deleteFiles(mainCallback, zipFileName);
            },
            function(mainCallback) {
                exports._zip(mainCallback, baseFileName, sha, zipFileName);
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

    exports._getCurrentGitHashCommit = function(mainCallback) {
        command.open(ROOT)
            .exec('git', ['rev-parse', 'HEAD'])
            .then(function() {
                mainCallback(this.lastOutput.stdout);
            });
    };

    exports._deleteFiles = function(mainCallback, zipFileName) {
        var finder = walkdir('.');
        var filesToDeleteMap = {
            '.DS_Store': 1
        };

        fs.unlink(zipFileName);

        finder.on('file', function(filename) {
            var basename = path.basename(filename);

            if (filesToDeleteMap[basename]) {
                fs.unlink(filename);
            }
        });

        finder.on('end', function() {
            mainCallback();
        });
    };

    exports._zip = function(mainCallback, baseFileName, sha, zipFileName) {
        var zip = new zipArchiver({
            file: zipFileName,
            root: baseFileName,
            comment: 'SHA: ' + sha + ' on ' + new Date()
        });

        async.series([
            function(zipCallback) {
                zip.add('build', function() {
                    zipCallback();
                });
            },
            function(zipCallback) {
                zip.add('demos', function() {
                    zipCallback();
                });
            },
            function(zipCallback) {
                zip.add('src', function() {
                    zipCallback();
                });
            },
            function(zipCallback) {
                zip.add('LICENSE.md', function() {
                    zipCallback();
                });
            },
            function(zipCallback) {
                zip.add('README.md', function() {
                    zipCallback();
                });
            },
            function(zipCallback) {
                zip.add('.alloy.json', function() {
                    zipCallback();
                });
            }],
            function() {
                zip.done(function() {
                    grunt.log.ok('Released ' + zipFileName);
                    mainCallback();
                });
            }
        );
    };
};