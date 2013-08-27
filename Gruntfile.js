/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var path  = require('path');
var spawn = require('child_process').spawn;
var which = require('which').sync;

// -- Config -------------------------------------------------------------------
module.exports = function(grunt) {
    var currentDir = process.env.PWD;
    var root       = process.cwd();

    grunt.initConfig({
        pkg: grunt.file.readJSON('.alloy.json'),
        build: {
            yui: {
                'src': path.join('<%= pkg.dependencies.yui3.folder %>', 'src'),
                'dist': path.join(root, 'build'),
                'cache': true,
                'coverage': false,
                'lint': false,
                'replace-yuivar': 'Y',
                'replace-version': '<%= pkg["yui-version"] %>',
            },
            aui: {
                'src': currentDir,
                'dist': path.join(root, 'build'),
                'cache': true,
                'coverage': false,
                'lint': false,
                'replace-yuivar': 'A',
                'replace-version': '<%= pkg["version"] %>',
            }
        },
        create: {
            name: 'aui-test'
        },
        release: {
            name: 'alloy-<%= pkg["version"] %>'
        },
        watch: {
            'src': currentDir,
            'replace-yuivar': 'A',
            'replace-version': '<%= pkg["version"] %>'
        },
        test: {}
    });

    // -- Install --------------------------------------------------------------
    grunt.registerTask('default', 'Install local dependencies', function() {
        var done = this.async();

        var cmd = spawn(which('npm'), ['install'], {
            stdio: 'inherit'
        });

        cmd.on('close', done);
    });

    grunt.registerTask('build',  ['default']);
    grunt.registerTask('create', ['default']);
    grunt.registerTask('release', ['default']);
    grunt.registerTask('watch',  ['default']);

    if (grunt.file.exists('node_modules')) {
        grunt.loadTasks('grunt');
    }
};