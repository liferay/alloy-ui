var path = require('path');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Config -------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('.alloy.json'),

        cdn: {
            combine: true,
            comboBase: 'http://cdn.alloyui.com/combo/combo.php?',
            filter: 'min',
            root: '../<%= pkg["version"] %>/'
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
            build: ['build'],
            zip: [
                'alloy-<%= pkg["version"] %>.zip',
                'cdn-alloy-<%= pkg["version"] %>.zip'
            ]
        },

        create: {
            name: 'aui-test'
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

    grunt.registerTask('all', ['clean:build', 'init', 'build']);
    grunt.registerTask('release', ['clean:zip', 'all', 'zip:release']);
    grunt.registerTask('release-cdn', ['clean:zip', 'all', 'cdn', 'zip:cdn', 'build:aui']);
};