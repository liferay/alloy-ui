/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var path = require('path');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Config -------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('.alloy.json'),

        'api-build': {
            'src': 'temp',
            'dist': path.join(ROOT, 'api'),
            'theme': path.join(ROOT, '<%= pkg.dependencies["alloy-apidocs-theme"].folder %>'),
            'aui-version': '<%= pkg["version"] %>'
        },

        'api-include': {
            'all': {
                'src': ['temp/alloy-ui/src/*/js/*.js'],
                'repo': path.join(ROOT, '<%= pkg.dependencies["alloyui.com"].folder %>')
            }
        },

        'api-push': {
            'src': path.join(ROOT, 'api'),
            'dist': path.join(ROOT, '<%= pkg.dependencies["alloyui.com"].folder %>', 'api'),
            'repo': path.join(ROOT, '<%= pkg.dependencies["alloyui.com"].folder %>'),
            'branch': 'gh-pages',
            'remote': 'origin'
        },

        'api-watch': {
            'src': [path.join(ROOT, 'src'), path.join(ROOT, '<%= pkg.dependencies.yui3.folder %>', 'src')],
            'theme': path.join(ROOT, '<%= pkg.dependencies["alloy-apidocs-theme"].folder %>'),
            'aui-version': '<%= pkg["version"] %>'
        },

        build: {
            yui: {
                'src': path.join(ROOT, '<%= pkg.dependencies.yui3.folder %>', 'src'),
                'dist': path.join(ROOT, 'build'),
                'cache': true,
                'coverage': false,
                'lint': false,
                'replace-yuivar': 'Y',
                'replace-version': '<%= pkg["yuiversion"] %>',
            },
            aui: {
                'src': path.join(ROOT, 'src'),
                'dist': path.join(ROOT, 'build'),
                'cache': false,
                'coverage': true,
                'istanbul': true,
                'lint': false,
                'replace-yuivar': 'A',
                'replace-version': '<%= pkg["version"] %>',
            }
        },

        cdn: {
            combine: true,
            comboBase: 'https://cdn.alloyui.com/combo/combo.php?',
            filter: 'min',
            root: '../<%= pkg["version"] %>/'
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
            api: {
                files: [
                    {
                        cwd: path.join('<%= pkg.dependencies.yui3.folder %>', 'src/'),
                        src: '**',
                        dest: 'temp/yui3/src/',
                        expand: true
                    },
                    {
                        cwd: 'src/',
                        src: '**',
                        dest: 'temp/alloy-ui/src/',
                        expand: true
                    }
                ]
            },
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

        compress: {
            zip: {
                options: {
                    mode: 'zip',
                    pretty: true
                },
                files: [
                    {
                        src: [
                            'build/**',
                            'demos/**',
                            'src/**',
                            'LICENSE.md',
                            'README.md',
                            '.alloy.json',
                            '!.DS_Store'
                        ]
                    }
                ]
            }
        },

        clean: {
            api: [
                'api', 'temp'
            ],
            css: [
                'build/aui-css/css/responsive.css',
            ],
            zip: [
                'alloy-<%= pkg["version"] %>.zip',
                'cdn-alloy-<%= pkg["version"] %>.zip'
            ]
        },

        create: {
            name: 'aui-test'
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

        jsbeautifier: {
            files: [
                'src/**/*.js',
                'src/**/*.css',
                'grunt/*.js',
                '!src/aui-base/js/aui-aliases.js',
                '!src/aui-base/js/aui-loader.js',
                '!src/yui/js/*.js'
            ],
            options: {
                config: '.jsbeautifyrc'
            }
        },

        jshint: {
            aui: ['*.js', 'src/**/js/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        test: {
            coverage: false
        },

        watch: {
            'src': ROOT,
            'replace-yuivar': 'A',
            'replace-version': '<%= pkg["version"] %>'
        },

        zip: {
            cdn: {
                name: 'cdn-alloy-<%= pkg["version"] %>.zip'
            },
            release: {
                name: 'alloy-<%= pkg["version"] %>.zip'
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('all', ['bootstrap', 'build']);
    grunt.registerTask('api', ['copy:api', 'api-include', 'api-build']);
    grunt.registerTask('api-deploy', ['api', 'api-push', 'clean:api']);
    grunt.registerTask('bootstrap', ['compass', 'copy:css', 'cssmin', 'copy:img', 'clean:css']);
    grunt.registerTask('format', ['jsbeautifier']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('release', ['clean:zip', 'all', 'zip:release']);
    grunt.registerTask('release-cdn', ['clean:zip', 'all', 'cdn', 'zip:cdn', 'build:aui']);
};