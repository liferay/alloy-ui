/*
 * Copyright (c) 2013, Liferay Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/liferay/alloy-ui/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <zeno.rocha@liferay.com>
 * @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
 */

var TASK = {
    name: 'cdn-config',
    description: 'Define some CDN configurations into build/aui directory.'
};

// -- Dependencies -------------------------------------------------------------
var fs   = require('fs-extra');
var path = require('path');

// -- Globals ------------------------------------------------------------------
var ROOT = process.cwd();

// -- Task ---------------------------------------------------------------------
module.exports = function(grunt) {
    grunt.registerTask(TASK.name, TASK.description, function() {
        var auiBuildDir = path.join(ROOT, 'build', 'aui'),
            files = [];

        files.push(path.join(auiBuildDir, 'aui.js'));
        files.push(path.join(auiBuildDir, 'aui-min.js'));
        files.push(path.join(auiBuildDir, 'aui-debug.js'));

        files.forEach(function(file) {
            fs.appendFile(file, '\nYUI_config = {' +
                                        'combine: true,' +
                                        'filter: "min",' +
                                        'comboBase: "http://cdn.alloyui.com/combo/combo.php?"' +
                                    '};');
        });
    });
};