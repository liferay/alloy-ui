#!/usr/bin/env node

/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

// -- Requires -----------------------------------------------------------------
var file = require('./file'),
    path = require('path'),
    alloyJSON = require('../../../.alloy.json');

// -- Header -------------------------------------------------------------------
var root = path.join(__dirname, '../../../'),
    buildDir = path.join(root, 'build'),
    auiDir = path.join(buildDir, 'aui');

// -- build yui ----------------------------------------------------------------
var files = file.find(auiDir, /\.js$/);

for (var i = 0; i < files.length; i++) {
    var filepath = path.join(auiDir, files[i]);

    // Add alloy core files
    file.append(filepath,   'YUI.Env.core.push.apply(YUI.Env.core, ' +
                                JSON.stringify(alloyJSON.alloycore) +
                            ');');

    // Replace _BASE_RE
    file.replaceRegex(filepath, /simpleyui\|yui/g, alloyJSON.alloyregex);
}