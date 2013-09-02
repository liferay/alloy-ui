/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'watch',
    description: 'Build and watch for any changes'
};

// -- Dependencies -------------------------------------------------------------
var async   = require('async');
var command = require('command');

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                exports._setShifterArgs(mainCallback);
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

    exports._setShifterArgs = function(mainCallback) {
        var args = [];
        var cwd = grunt.config([TASK.name, 'src']);

        args.push('--replace-yuivar=' + grunt.config([TASK.name, 'replace-yuivar']));
        args.push('--replace-version=' + grunt.config([TASK.name, 'replace-version']));
        args.push('--watch');

        exports._runShifter(mainCallback, args, cwd);
    };

    exports._runShifter = function(mainCallback, args, cwd) {
        command.open(cwd)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('shifter', args)
            .then(function() {
                mainCallback();
            });
    };
};