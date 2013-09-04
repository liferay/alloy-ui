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

// -- Globals ------------------------------------------------------------------
var CURRENT_DIR = process.env.PWD;
var ROOT        = process.cwd();

// -- Config -------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('.alloy.json'),

        'api-build': {
            'src': ROOT,
            'dist': path.join(ROOT, 'api'),
            'aui-version': '<%= pkg["version"] %>',
            'theme': path.join(ROOT, '<%= pkg.dependencies["alloy-apidocs-theme"].folder %>')
        },

        'api-push': {
            'src': path.join(ROOT, 'api'),
            'dist': path.join(ROOT, '<%= pkg.dependencies["alloyui.com"].folder %>', 'api'),
            'repo': path.join(ROOT, '<%= pkg.dependencies["alloyui.com"].folder %>'),
            'branch': 'gh-pages',
            'remote': 'origin'
        },

        'api-watch': {
            'aui-version': '<%= pkg["version"] %>',
            'theme': path.join(ROOT, '<%= pkg.dependencies["alloy-apidocs-theme"].folder %>')
        },

        build: {
            yui: {
                'src': path.join(ROOT, '<%= pkg.dependencies.yui3.folder %>', 'src'),
                'dist': path.join(ROOT, 'build'),
                'cache': true,
                'coverage': false,
                'lint': false,
                'replace-yuivar': 'Y',
                'replace-version': '<%= pkg["yui-version"] %>',
            },
            aui: {
                'src': CURRENT_DIR,
                'dist': path.join(ROOT, 'build'),
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

        init: {
            dependencies: '<%= pkg.dependencies %>'
        },

        release: {
            name: 'alloy-<%= pkg["version"] %>'
        },

        test: {
            coverage: false
        },

        watch: {
            'src': CURRENT_DIR,
            'replace-yuivar': 'A',
            'replace-version': '<%= pkg["version"] %>'
        }
    });

    grunt.registerTask('api-deploy', ['api-build', 'api-push']);

    // -- Install --------------------------------------------------------------
    grunt.registerTask('default', 'Install local dependencies', function() {
        var done = this.async();

        var cmd = spawn(which('npm'), ['install'], {
            stdio: 'inherit'
        });

        cmd.on('close', done);
    });

    grunt.registerTask('api-build', ['default']);
    grunt.registerTask('api-push',  ['default']);
    grunt.registerTask('api-watch', ['default']);
    grunt.registerTask('build',     ['default']);
    grunt.registerTask('create',    ['default']);
    grunt.registerTask('release',   ['default']);
    grunt.registerTask('test',      ['default']);
    grunt.registerTask('watch',     ['default']);

    if (grunt.file.exists('node_modules')) {
        grunt.loadTasks('grunt');
    }
};