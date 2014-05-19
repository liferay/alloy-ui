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
            'theme': path.join(ROOT, 'bower_components/alloy-apidocs-theme'),
            'aui-version': '<%= pkg["version"] %>'
        },

        'api-include': {
            'all': {
                'src': ['temp/alloy-ui/src/*/js/*.js'],
                'repo': path.join(ROOT, 'bower_components/alloyui.com')
            }
        },

        'api-push': {
            'src': path.join(ROOT, 'api'),
            'dist': path.join(ROOT, 'bower_components/alloyui.com/api'),
            'repo': path.join(ROOT, 'bower_components/alloyui.com'),
            'branch': 'gh-pages',
            'remote': 'origin'
        },

        'api-watch': {
            'src': [path.join(ROOT, 'src'), path.join(ROOT, 'bower_components/yui3/src')],
            'theme': path.join(ROOT, 'bower_components/alloy-apidocs-theme'),
            'aui-version': '<%= pkg["version"] %>'
        },

        build: {
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
            comboBase: 'http://cdn.alloyui.com/combo/combo.php?',
            filter: 'min',
            root: '../<%= pkg["version"] %>/'
        },

        copy: {
            api: {
                files: [
                    {
                        cwd: path.join('bower_components/yui3/src/'),
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
            api: ['api', 'temp'],
            build: ['build'],
            zip: [
                'alloy-<%= pkg["version"] %>.zip',
                'cdn-alloy-<%= pkg["version"] %>.zip'
            ]
        },

        create: {
            name: 'aui-test'
        },

        cssbeautifier : {
            files : [
                'src/**/*.css',
                '!src/aui-css/css/*.css'
            ]
        },

        jsbeautifier: {
            files: [
                'src/**/*.js',
                'grunt/*.js',
                '!src/aui-base/js/aui-aliases.js',
                '!src/aui-base/js/aui-loader.js',
                '!src/yui/js/*.js'
            ],
            options: {
                config: '.jsbeautifyrc'
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

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('all', ['clean:build', 'init', 'build']);
    grunt.registerTask('api', ['copy:api', 'api-include', 'api-build']);
    grunt.registerTask('api-deploy', ['api', 'api-push', 'clean:api']);
    grunt.registerTask('format', ['cssbeautifier', 'jsbeautifier']);
    grunt.registerTask('release', ['clean:zip', 'all', 'zip:release']);
    grunt.registerTask('release-cdn', ['clean:zip', 'all', 'cdn', 'zip:cdn', 'build:aui']);
};