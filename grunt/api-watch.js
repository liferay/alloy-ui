/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'api-watch',
    description: 'Run the API Docs locally and watch for any changes.'
};

// -- Dependencies -------------------------------------------------------------
var async   = require('async');
var command = require('command');
var path    = require('path');

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
                exports._runYuidoc(mainCallback);
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

    exports._runYuidoc = function(mainCallback) {
        var auiVersion = grunt.config([TASK.name, 'aui-version']);
        var configFile = path.join(grunt.config([TASK.name, 'theme']), 'yuidoc.json');

        command.open(ROOT)
            .on('stdout', command.writeTo(process.stdout))
            .on('stderr', command.writeTo(process.stderr))
            .exec('yuidoc', ['-c', configFile, '--project-version', auiVersion, '--server'])
            .then(function() {
                mainCallback();
            });
    };
};