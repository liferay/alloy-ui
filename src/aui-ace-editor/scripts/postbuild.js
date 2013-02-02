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
    srcDir = path.join(root, 'src'),
    tempPath = path.join(srcDir, 'aui-ace-editor', 'js', '.aui-ace-editor.js');

// -- build --------------------------------------------------------------------
file.remove(tempPath);