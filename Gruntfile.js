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

        compass: {
            dist: {
                options: {
                    sassDir: path.join(ROOT, '<%= pkg.dependencies["alloy-bootstrap"].folder %>', 'lib'),
                    cssDir: 'build/aui-css/css/'
                }
            }
        },

        copy: {
            css: {
                files: [
                    {
                        src: 'build/aui-css/css/responsive.css',
                        dest: 'build/aui-css/css/bootstrap-responsive.css'
                    }
                ]
            },
            img: {
                files: [
                    {
                        src: path.join(ROOT, '<%= pkg.dependencies["alloy-bootstrap"].folder %>', 'img/glyphicons-halflings-white.png'),
                        dest: 'build/aui-css/img/glyphicons-halflings-white.png'
                    },
                    {
                        src: path.join(ROOT, '<%= pkg.dependencies["alloy-bootstrap"].folder %>', 'img/glyphicons-halflings.png'),
                        dest: 'build/aui-css/img/glyphicons-halflings.png'
                    }
                ]
            }
        },

        create: {
            name: 'aui-test'
        },

        clean: {
            css: [
                'build/aui-css/css/responsive.css',
            ]
        },

        cssmin: {
            dist: {
                files: {
                    'build/aui-css/css/bootstrap.min.css': ['build/aui-css/css/bootstrap.css'],
                    'build/aui-css/css/bootstrap-responsive.min.css': ['build/aui-css/css/bootstrap-responsive.css']
                }
            }
        },

        init: {
            dependencies: '<%= pkg.dependencies %>'
        },

        compress: {
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

    grunt.loadTasks('grunt');

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('api-deploy', ['api-build', 'api-push']);
    grunt.registerTask('bootstrap', ['compass', 'copy:css', 'cssmin', 'copy:img', 'clean']);
    grunt.registerTask('release', ['build', 'bootstrap', 'compress']);
};