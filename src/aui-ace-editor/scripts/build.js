#!/usr/bin/env node

/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

// -- Requires -----------------------------------------------------------------
var file = require('../../aui-base/scripts/file'),
    path = require('path');

// -- Header -------------------------------------------------------------------
var root = path.join(__dirname, '../../../'),
    alloyJSON = require(path.join(root, '.alloy.json')),
    aceBuildDir = path.join(root, 'build', 'aui-ace-editor', 'ace'),
    acePath = path.join(root, alloyJSON.dependencies.ace.folder, 'src-min'),
    jsPath = path.join(root, 'src', 'aui-ace-editor', 'js'),
    tempPath = path.join(jsPath, '.aui-ace-editor.js'),
    alloyContent = file.read(path.join(jsPath, 'aui-ace-editor.js')),
    aceContent = file.read(path.join(acePath, 'ace.js'));

// -- build --------------------------------------------------------------------
file.write(tempPath, aceContent + alloyContent);
file.mkdir(aceBuildDir);
file.copy(acePath, aceBuildDir);