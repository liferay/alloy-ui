/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'create',
    description: 'Create a new module under src/ folder'
};

// -- Dependencies -------------------------------------------------------------
var async = require('async');
var spawn = require('child_process').spawn;
var which = require('which').sync;

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                exports._runCommand(mainCallback);
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
        if (typeof grunt.option('name') === 'string') {
            grunt.config([TASK.name, 'name'], grunt.option('name'));
        }

        // Add 'aui' prefix if necessary
        if (grunt.config([TASK.name, 'name']).indexOf('aui-') !== 0) {
            grunt.config([TASK.name, 'name'], 'aui-' + grunt.config([TASK.name, 'name']));
        }

        mainCallback();
    };

    exports._runCommand = function(mainCallback) {
        var cmd = spawn(which('yogi'), ['init', grunt.config('create.name')], {
            stdio: 'inherit'
        });

        cmd.on('close', mainCallback);
    };
};