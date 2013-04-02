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
    path = require('path');

// -- Header -------------------------------------------------------------------
var root = path.join(__dirname, '../../../'),
    srcDir = path.join(root, 'src'),
    alloyAliasesPath = path.join(srcDir, 'aui-base/js/aui-aliases.js');

// -- build yui ----------------------------------------------------------------
file.write(alloyAliasesPath, 'var Y = A;\n' + aliases.getContent());