#!/usr/bin/env node

/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

// -- Requires -----------------------------------------------------------------
var aliases = require('./aliases'),
    file = require('./file'),
    path = require('path'),
    spawn = require('child_process').spawn;

// -- Header -------------------------------------------------------------------
var TMPDIR = process.env.TMPDIR,
    root = path.join(__dirname, '../../../'),
    srcDir = path.join(root, 'src'),
    buildDir = path.join(root, 'build'),
    yuiSrcDir = path.join(root, '../yui3/src/'),
    yuiPath = path.join(yuiSrcDir, 'yui/js/yui.js'),
    rollupPath = path.join(yuiSrcDir, 'loader/js/rollup.js'),
    alloyLoaderPath = path.join(srcDir, 'aui-base/js/aui-loader.js');

// -- CLI ----------------------------------------------------------------------
if (!file.exists(yuiSrcDir)) {
    console.error('No yui source directory found at: ' + yuiSrcDir);
    process.exit(1);
}

// -- build yui ----------------------------------------------------------------
var YUI_BASE_RE = /simpleyui\|yui/g,
    YUI_CORE = [ 'get', 'features', 'intl-base', 'yui-log', 'yui-later', 'loader-base', 'loader-rollup', 'loader-yui3', 'aui-loader', 'aui-base-core' ];

var yogi = spawn(
    'yogi',
    [ 'loader', '--expand', '--js', 'js/aui-loader.js', '--json', 'js/aui-loader.json', '--mix', '--name', 'aui-loader', '--start', '../', '--yes' ]
);

yogi.on('exit', function(err) {
    var yuiOriginalContent = file.read(yuiPath),
        yuiContent = yuiOriginalContent.replace(YUI_BASE_RE, "simpleaui|aui|simpleyui|yui"),
        alloyLoaderContent = file.read(alloyLoaderPath),
        rollupOriginalContent = file.read(rollupPath);

    file.write(yuiPath, yuiContent + alloyLoaderContent);
    file.append(rollupPath, aliases.getContent());

    var shifter = spawn(
        'shifter',
        [
            '--build-dir', buildDir,
            '--replace-yui_core=' + JSON.stringify(YUI_CORE)
        ],
        {
            cwd: path.join(yuiSrcDir, 'yui')
        }
    );

    shifter.on('exit', function(err) {
        file.write(yuiPath, yuiOriginalContent);
        file.write(rollupPath, rollupOriginalContent);
    });
});
