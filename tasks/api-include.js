/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 */

var TASK = {
    name: 'api-include',
    description: 'Import code examples from a repository to the API Docs.'
};

// -- Dependencies -------------------------------------------------------------
var async = require('async');
var command = require('command');
var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
var walkdir = require('walkdir');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var done = this.async();
        var files = [];

        async.series([
            function(mainCallback) {
                exports._setGruntConfig(mainCallback);
            },
            function(mainCallback) {
                exports._walkDir(function(val) {
                    files = val;
                    mainCallback();
                });
            },
            function(mainCallback) {
                exports._replaceInclude(mainCallback, files);
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
                key = option.substring(0, valueIndex);
                value = option.substring(valueIndex + 1);
            }
            // Boolean parameter
            else {
                key = option;
                value = grunt.option(key);
            }

            grunt.config([TASK.name, key], value);
        });

        mainCallback();
    };

    // TODO - Only walk on 'src/**/js' - only match for '.js'
    exports._walkDir = function(mainCallback) {
        var files = [];
        var finder = walkdir(grunt.config([TASK.name, 'src']));

        finder.on('file', function(filename) {
            if (filename.match(/^(?:(?!filename\.js$).)*\.js$/)) {
                files.push(filename);
            }
        });

        finder.on('end', function() {
            mainCallback(files);
        });
    };

    exports._replaceInclude = function(mainCallback, files) {
        files.forEach(function(file) {
            // Read file
            var fileContent = fs.readFileSync(file, 'utf8');

            // Find @include
            var tokens = fileContent.match(/@include [^\s]+/g);

            if (tokens) {
                grunt.log.write('Replacing @include token in: ' + file.cyan + '\n');

                tokens.forEach(function(token) {
                    // Get local path from remote url
                    var replacedToken = token.replace(/http:\/\/alloyui.com/g,
                        path.resolve(grunt.config([TASK.name, 'repo']), 'src/documents'));

                    // Extract local path
                    var remoteUrl = token.split(' ')[1];
                    var includeFilePath = replacedToken.split(' ')[1];

                    // Read files from alloyui.com
                    var includeFileContent = fs.readFileSync(includeFilePath, 'utf8');

                    // Wrap content in Markdown markup
                    includeFileContent = '@example\n```\n' + includeFileContent + '\n```';

                    // Replace @include with @example, and remote url with include file content
                    fileContent = fileContent.replace(token, includeFileContent);
                });

                // Save file
                fs.writeFileSync(file, fileContent, 'utf8');
            }
        });

        mainCallback();
    };
};