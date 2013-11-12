/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 */

var TASK = {
    name: 'zip',
    description: 'Build and watch for any changes'
};

// -- Dependencies -------------------------------------------------------------
var async = require('async');
var command = require('command');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerMultiTask(TASK.name, TASK.description, function() {
        var done = this.async();
        var target = this.target;
        var sha;

        async.series([
                function(mainCallback) {
                    exports._setGruntConfig(mainCallback, target);
                },
                function(mainCallback) {
                    exports._getCurrentGitHashCommit(function(val) {
                        sha = val;
                        mainCallback();
                    });
                },
                function(mainCallback) {
                    exports._setZipComment(mainCallback, target, sha);
                }
            ],
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

    exports._setGruntConfig = function(mainCallback, target) {
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
                key = option.substring(0, valueIndex);
                value = option.substring(valueIndex + 1);
            }
            // Boolean parameter
            else {
                key = option;
                value = grunt.option(key);
            }

            grunt.config([TASK.name, target, key], value);
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

    exports._setZipComment = function(mainCallback, target, sha) {
        var comment = 'SHA: ' + sha + ' on ' + new Date();
        var name = grunt.config([TASK.name, target, 'name']);

        grunt.config(['compress', 'options', 'comment'], comment);
        grunt.config(['compress', 'options', 'archive'], name);
        grunt.task.run('compress');

        mainCallback();
    };
};